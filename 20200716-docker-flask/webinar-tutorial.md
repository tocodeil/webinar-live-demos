# Let's Dockerize a Python/Flask app
The dev team has left you an app with a note "It works on my machine" asking you to deploy it.
In this webinar we'll learn how to build a Python/Flask/PostgreSQL docker container architecture and deploy the app.

## Create the DB
Let's start by playing with Docker and PostgreSQL.

1. Login to Docker playground

2. Create a new instance (left sidebar "Add New Instance")

3. Click on it

4. Bravo! Now you have a first working VM. Let's install a DB container in it

5. There are many docker images online waiting for you to use them.
Let's install an image called "postgres" that contains a PostgreSQL database server.

6. Go to the image homepage at:
[https://hub.docker.com/\_/postgres](https://hub.docker.com/_/postgres)

And try to find from there:
  - How do you run a container with this image?
  - How do you select the database password?
  - How do you select the database user name?
  - How do you select the database name?














7. In docker we use environment variables to customise an image. So we'll have:
  - POSTGRES_PASSWORD to set the password
  - POSTGRES_USER to set the user name
  - POSTGRES_DB to set the database name


Run the following command to create a new database named "helloworld" owned by user "docker" with password "secret":

```
docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=secret -e POSTGRES_USER=docker -e POSTGRES_DB=helloworld postgres
```

## Verify DB is created and available

1.
Wow our DB is online. But wait - how can we connect to it and verify it is really up?
See if you can figure it out from:
https://docs.docker.com/engine/reference/commandline/exec/














2. Let's use docker again.
The command `docker exec` will let us run a command on a running container.
List all containers with:

```
docker ps
```

(there should be only one). Find its ID (it's the first column). You can run the following command to print  only the ID:

```
docker ps -q
```

And run exec to execute the psql client inside that one container:

```
docker exec -it $(docker ps -q) psql -U docker helloworld
```









3. Verify DB is available to other hosts
Not only do we need to be able to connect to a docker container, but we want also that our application will connect to it. For that let's create another container with a PostgreSQL client and try to connect to the DB.

3. Execute the command:

```
docker run --network host -it ubuntu:20.04
```

To start a new Ubuntu container on the host network. From inside Ubuntu install postgresql client by running:

```
apt-get update
apt-get install postgresql-client
```

Then use postgresql client to connect. You'll need to replace the IP address I write here by the one of your instance and type:

```
psql -h 192.168.0.18 -p 5432 -U docker helloworld
```

This time you will be asked for a password. Type the one you selected when creating the DB container and verify you can connect to the DB.



## Create a simple flask webapp
In the project's reapository you'll find a file called simpleapp.py. Here's what's written inside of it:

```language-python
from flask import Flask
app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
```

This is a simple flask webapp that only shows the text "Hello world" to any visitor.

Let's create a docker image to run this file and verify we can connect to the app.

This time our image is based on the python docker image.

See if you can find out from its documentation how to create a Dockerfile to run our simpleapp.py:
[https://hub.docker.com/\_/python](https://hub.docker.com/_/python)







1. In the project's directory, create a file called Dockerfile and in it type the following contents:

```
# Use an official Python runtime as a parent image
FROM python:3.8.3-buster

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

ENV FLASK_ENV "development"

# Run app.py when the container launches
CMD ["python", "simpleapp.py"]
```

2. From the project's directory run:

```
docker build . --tag my-python-webapp:latest
```

3. Run the following command to start the server

```
docker run -p 5000:5000 my-python-webapp:latest
```

Inside docker playground click on the number "5000" to the right of the IP (next to Open Port button) to connect to your new service. You should see a new browser tab with the text "Hello, World!".

This is the text received from our simple flask app.








## Combine the two services using docker-compose

## Create a modern flask webapp that connects to a DB

## Verify your webapp is running

## Research Questions
