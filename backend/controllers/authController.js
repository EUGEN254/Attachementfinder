import bcrypt from "bcrypt";
import sql from "../configs/connectDB.js";
import generateToken from "../utils/generateToken.js";
import logger from "../utils/logger.js";

// register user
export const register = async (req, res) => {
  try {
    const { email, password, userType, name, companyName } = req.body;
    logger.auth(
      `Registration attempt for email: ${email}, userType: ${userType}`,
    );

    // check if user exists
    const existingUser = await sql`SELECT id FROM users WHERE email = ${email}`;
    if (existingUser.length > 0) {
      logger.warn(`Registration failed - email already exists: ${email}`);
      return res.status(400).json({ message: "Email already registered" });
    }

    // hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // start transaction
    const userId = crypto.randomUUID();

    // insert into users table
    await sql`
      INSERT INTO users (id, email, password_hash, user_type)
      VALUES (${userId}, ${email}, ${passwordHash}, ${userType})
    `;

    // Insert into specific table based on user type
    if (userType === "student") {
      await sql`
        INSERT INTO students (user_id, full_name)
        VALUES (${userId}, ${name})
      `;
      logger.success(`Student registered: ${email} (${name})`);
    } else {
      await sql`
        INSERT INTO companies (user_id, company_name)
        VALUES (${userId}, ${companyName})
      `;
      logger.success(`Company registered: ${email} (${companyName})`);
    }

    const displayName = userType === "student" ? name : companyName;

    const jwtToken = generateToken(userId, email, displayName, userType);
    res.cookie("token", jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: { name, email, userType },
    });
  } catch (error) {
    logger.error("Registration error:", error.message);
    res.status(500).json({ error: "Registration failed" });
  }
};

// login user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    logger.auth(`Login attempt for email: ${email}`);

    const user = await sql`SELECT * FROM users WHERE email = ${email}`;
    if (user.length === 0) {
      logger.warn(`Login failed - email not found: ${email}`);
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const validPassword = await bcrypt.compare(password, user[0].password_hash);
    if (!validPassword) {
      logger.warn(`Login failed - invalid password for email: ${email}`);
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Get name/companyName based on user type
    let displayName = "";
    if (user[0].user_type === "student") {
      const student = await sql`
        SELECT full_name FROM students WHERE user_id = ${user[0].id}
      `;
      displayName = student[0].full_name;
    } else {
      const company = await sql`
        SELECT company_name FROM companies WHERE user_id = ${user[0].id}
      `;
      displayName = company[0].company_name;
    }

    const jwtToken = generateToken(
      user[0].id,
      email,
      displayName,
      user[0].user_type,
    );
    res.cookie("token", jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    logger.success(`Login successful for email: ${email}`);
    res.json({
      success: true,
      message: "Login successful",
      user: { email, userType: user[0].user_type },
    });
  } catch (error) {
    logger.error("Login error:", error.message);
    res.status(500).json({ error: "Login failed" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
  });
  res.json({ success: true, message: "Logged out successfully" });
};

export const getCurrentUser = async (req, res) => {
  try {
    const { id, email, name, userType } = req.user;

    logger.auth(`Retrieved current user from token: ${email}`);

    res.json({
      success: true,
      user: {
        id,
        email,
        name,
        userType,
      },
    });
  } catch (error) {
    logger.error("Get current user error:", error.message);
    res.status(500).json({ error: "Failed to retrieve user" });
  }
};
