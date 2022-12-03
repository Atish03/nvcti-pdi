# Models
#### There are two models
- user
    - New user created is stored in "user" collection of "nvcti-pdi" database.
    - The field "formSubmitted" is where the ObjectID of forms submitted by the user is stored as an array, other fields are self explainatory.
- form
    - A schema of a typical application for PDI form.
- evaluator
    - Each evaluator has its schema which consists an array of the applicants it has to evaluate.

# Controllers
* authController

    To control process required for authentication.

# Routes
- auth
    * `/register`

        Register a new user (POST request using the data from the form, should contain all the required fields in the user schema).

    * `/verify-email/:emailToken`

        Verify the email provided by the user using nodemailer and then add the user to database. 

    *  `/login`

        Login an existing user.

- evaluator
    * `/createevaluator`

        Route to create an empty evaluator database for admin.

    * `/applicants`

        API to get the array of applicants for specific evaluator.

    * `/update`

        API to update the status of an application (POST request requires "status" field in the body)

    * `/forward`

        Route to forward the selected applicant to the specified mentor (the mails entered at time of forward).

    * `/forwardsuperadmin`

        Route to forward the selected applicants to superadmin for final evaluation

    * `/addcomment`

        Route to add comment to application.

- form
    * `/getform/:formId`

        API to get submitted form by its "formId".

    * `/getforms/:userId`

        API to get all the forms submitted by the user.

    * `/submit`

        Route to submit an application (POST request requires all the required field in the schema)


# Environment variables
- JWT_SECRET
- EMAIL_VERIFY_TOKEN_SECRET
- CLIENT_ADDRESS2
- JWT_LIFETIME
