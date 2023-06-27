const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config");
const connection = require("../database/connect");
const jwtSecret = config.jwtSecret;

class AuthController {
  register(req, res) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Vérifier si l'utilisateur existe déjà
    const checkUserQuery = "SELECT * FROM users WHERE email = ?";
    connection.query(checkUserQuery, [email], (err, rows) => {
      if (err) {
        console.error("Error executing query:", err);
        return res.status(500).json({ error: "Internal server error" });
      }
      if (rows.length > 0) {
        return res.status(400).json({ error: "User already exists" });
      }

      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
          console.error("Error hashing password:", err);
          return res.status(500).json({ error: "Internal server error" });
        }

        const insertUserQuery =
          "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
        connection.query(
          insertUserQuery,
          [name, email, hashedPassword],
          (err, result) => {
            if (err) {
              console.error("Error executing query:", err);
              return res.status(500).json({ error: "Internal server error" });
            }

            // Récupérer l'ID de l'utilisateur nouvellement inséré
            const userId = result.insertId;

            // Définir le rôle par défaut "admin" (5) pour l'utilisateur
            const insertUserRoleQuery =
              "INSERT INTO role_user (user_id, role_id) VALUES (?, ?)";
            connection.query(
              insertUserRoleQuery,
              [userId, 5], // 5 correspond à l'ID du rôle "admin"
              (err) => {
                if (err) {
                  console.error("Error executing query:", err);
                  return res
                    .status(500)
                    .json({ error: "Internal server error" });
                }

                return res
                  .status(201)
                  .json({ message: "User registered successfully" });
              }
            );
          }
        );
      });
    });
  }

  login(req, res) {
    const { email, password } = req.body;

    // Vérifier si l'utilisateur existe
    const getUserQuery = `
        SELECT users.*, roles.name AS role
        FROM users
        LEFT JOIN role_user ON users.id = role_user.user_id
        LEFT JOIN roles ON role_user.role_id = roles.id
        WHERE email = ?
    `;
    connection.query(getUserQuery, [email], (err, rows) => {
      if (err) {
        console.error("Error executing query:", err);
        return res.status(500).json({ error: "Internal server error" });
      }

      if (rows.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }

      const user = rows[0];

      // Comparer les mots de passe
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          console.error("Error comparing passwords:", err);
          return res.status(500).json({ error: "Internal server error" });
        }

        if (!result) {
          return res.status(401).json({ error: "Incorrect password" });
        }

        // Générer un JWT (JSON Web Token)
        const token = jwt.sign({ userId: user.id }, jwtSecret, {
          expiresIn: "2h", // Le token expirera après 2 heure
        });

        return res.status(200).json({ user: user, token: token });
      });
    });
  }
}

module.exports = AuthController;
