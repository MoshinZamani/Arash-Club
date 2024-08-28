import bcrypt
import getpass

# Prompt the user to enter a password securely
password = getpass.getpass("Enter password to hash: ")

# Generate a salt and hash the password
hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

# Print the hashed password
print("Hashed password:", hashed_password.decode('utf-8'))
