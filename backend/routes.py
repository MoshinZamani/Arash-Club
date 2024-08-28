from flask import Blueprint, request, jsonify
from app import mysql
from flask_cors import CORS
import requests
from flask_bcrypt import Bcrypt
import jwt
import datetime
import pytz
from pprint import pprint

main = Blueprint('main', __name__)

bcrypt = Bcrypt()
SECRET_KEY = "secret"

@main.route('/register', methods=['POST'])
def register():
    fname = request.form.get('fName')
    lname = request.form.get('lName')
    father_name = request.form.get('fatherName')
    mobile = request.form.get('mobile')
    melli_code = request.form.get('melliCode')
    birth_day = request.form.get('birthDay')
    birth_month = request.form.get('birthMonth')
    birth_year = request.form.get('birthYear')
    hashed_password = bcrypt.generate_password_hash(request.form.get('password')).decode("utf-8")
    captcha_response = request.form.get('captcha')

    secret_key = "6LfpGCsqAAAAAPJOETtpIWIl5YgCtMprqH77H9mJ"
    captcha_data = {
        'secret': secret_key,
        'response': captcha_response
    }
    url = "https://www.google.com/recaptcha/api/siteverify"
    captcha_verification_response = requests.post(url, data=captcha_data)
    verification_result = captcha_verification_response.json()

    if not verification_result.get('success'):
        return jsonify({"error": "Invalid CAPTCHA. Please try again."}), 400
    
    try:
        cursor = mysql.connection.cursor()
        query = """
        INSERT INTO users (first_name, last_name, father_name, mobile, national_id, birth_day, birth_month, birth_year, password)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
        cursor.execute(query, (fname, lname, father_name, mobile, melli_code, birth_day, birth_month, birth_year, hashed_password))
        mysql.connection.commit()
        cursor.close()
        return jsonify({"message": "User registered successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@main.route('/login', methods=['POST'])
def login():
    melli_code = request.form.get('melliCode')
    password = request.form.get('password')

    try:
        cursor = mysql.connection.cursor()
        cursor.execute("SELECT * FROM users WHERE national_id = %s", (melli_code,))
        user = cursor.fetchone()
        cursor.close()
        if user and bcrypt.check_password_hash(user['password'], password):
            # Create timezone-aware UTC datetime
            utc_now = datetime.datetime.now(pytz.utc)
            
            # Create JWT token
            token = jwt.encode({
                'user_id': user['id'],
                'exp': utc_now + datetime.timedelta(hours=1)  # Set expiration time
            }, SECRET_KEY, algorithm='HS256')
            print(f"user['user_type']: {user['type_user']}")
            return jsonify({
                "message": "Login successful",
                "token": token,
                "user": {
                    "id": user['id'],
                    "first_name": user['first_name'],
                    "last_name": user['last_name'],
                    "type": user['type_user'],
                    "melliCode": user['national_id'],
                }
            }), 200
        else:
            return jsonify({"error": "کدملی یا رمز عبور را دوباره بررسی کنید"}), 401
    except Exception as e:
        print(str(e))
        return jsonify({"error": str(e)}), 500
    



@main.route('/courses/<int:national_id>', methods=['GET'])
def get_courses_for_user(national_id):
    try:
        cursor = mysql.connection.cursor()

        # Query to fetch courses for the specified user
        query_taken = """
        SELECT courses.id, courses.event_date, courses.coach, courses.capacity, courses.capacity_left, courses.course_name, users_courses.grade
        FROM courses
        JOIN users_courses ON courses.id = users_courses.course_id
        WHERE users_courses.national_id = %s
        """
        cursor.execute(query_taken, (national_id,))
        taken_courses = cursor.fetchall()

        # Query to fetch courses not assigned to the specified user
        query_available = """
        SELECT courses.id, courses.event_date, courses.coach, courses.capacity, courses.capacity_left, courses.course_name, courses.price
        FROM courses
        WHERE courses.id NOT IN (
            SELECT course_id FROM users_courses WHERE national_id = %s
        )
        """
        cursor.execute(query_available, (national_id,))
        available_courses = cursor.fetchall()

        cursor.close()

        return jsonify({
            'taken_courses': taken_courses,
            'available_courses': available_courses
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

@main.route("/courses")
def get_all_courses():
    try :
        cursor = mysql.connection.cursor()

        query = """
        SELECT * FROM courses
        """

        cursor.execute(query)
        courses = cursor.fetchall()

        cursor.close()

        return jsonify({
            "courses": courses
        }), 200
        
    except Exception as e :
        return jsonify({"error": str(e)}), 500
    

@main.route("/students")
def students():
    try :
        cursor = mysql.connection.cursor()

        query = """
        SELECT first_name, last_name, national_id FROM users WHERE type_user='student'
        """

        cursor.execute(query)
        students = cursor.fetchall()

        cursor.close()

        return jsonify({
            "students": students
        }), 200
    
    except Exception as e :
        return jsonify({"error": str(e)}), 500



    

@main.route("/news", methods=["GET"])
def news():
    try:
        cursor = mysql.connection.cursor()
        
        query= """
        SELECT * FROM news
        """
        cursor.execute(query)
        news = cursor.fetchall()
        cursor.close()
        
        return jsonify({"news": news})
        
    except Exception as e :
            return jsonify({"error": str(e)}), 500
    
@main.route("/news", methods=["POST"])
def add_news():
    try:
        
        title = request.form.get("title")
        description = request.form.get("description")

        cursor = mysql.connection.cursor()
        query = """INSERT INTO news(title, description) VALUES(%s, %s)"""
        cursor.execute(query, (title, description,))
        mysql.connection.commit()
        cursor.close()

        return jsonify({"message": "خبر با موفقیت ثبت شد."}), 201
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@main.route("/news/<int:id>", methods=["DELETE"])
def delete_news(id):
    try:
        cursor = mysql.connection.cursor()

        query = """DELETE FROM news WHERE id = %s"""
        cursor.execute(query, (id,))
        mysql.connection.commit()
        cursor.close()

        return jsonify({"message": "خبر با موفقیت حذف شد."}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    


@main.route('/students/<int:national_id>/courses/<int:course_id>', methods=['POST'])
def add_course_for_user(national_id, course_id):
    try:
        cursor = mysql.connection.cursor()

        # Insert into users_courses table to register the student for the course
        query = """
        INSERT INTO users_courses (national_id, course_id)
        VALUES (%s, %s)
        """
        cursor.execute(query, (national_id, course_id))
        mysql.connection.commit()
        cursor.close()

        return jsonify({"message": "Course added successfully"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@main.route('/students/<int:national_id>/courses/<int:course_id>', methods=['DELETE'])
def delete_course_for_user(national_id, course_id):
    try:
        cursor = mysql.connection.cursor()

        # Delete from users_courses table to unregister the student from the course
        query = """
        DELETE FROM users_courses
        WHERE national_id = %s AND course_id = %s
        """
        cursor.execute(query, (national_id, course_id))
        mysql.connection.commit()
        cursor.close()

        return jsonify({"message": "Course deleted successfully"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

@main.route('/courses', methods=['POST'])
def add_course():
    try:
        title = request.json.get('title')
        coach = request.json.get('coach')
        price = request.json.get('price')
        capacity = request.json.get('capacity')
        event_date = request.json.get('event_date')

        cursor = mysql.connection.cursor()
        query = """
        INSERT INTO courses (course_name, coach, price, capacity, capacity_left, event_date)
        VALUES (%s, %s, %s, %s, %s, %s)
        """
        # Assuming capacity_left is initialized with the same value as capacity
        cursor.execute(query, (title, coach, price, capacity, capacity, event_date))
        mysql.connection.commit()
        cursor.close()

        return jsonify({"message": "Course added successfully"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500


    


    


    



