# Let's Dockerize a Python/Flask app
The dev team has left you an app with a note "It works on my machine" asking you to deploy it.
In this webinar we'll learn how to build a Python/Flask/PostgreSQL docker container architecture and deploy the app.

To take part in this webinar you'll need a Docker Playground account. After you have one start with:

1. Login to Docker playground:
https://labs.play-with-docker.com/

2. Create a new instance (left sidebar "Add New Instance")

3. Click on it

4. Bravo! Now you have a first working VM. Let's install a DB container in it

Also keep a bookmark on my docker shortcuts and tips here:
https://www.tocode.co.il/blog/2019-02-docker-cheatsheet

Or the longer one here:
http://dockerlabs.collabnix.com/docker/cheatsheet/







## Clone the repo to your docker playground instance
First we need the code:

```
git clone https://github.com/tocodeil/webinar-live-demos/
```








## Create the DB
Let's start by playing with Docker and PostgreSQL.

1. There are many docker images online waiting for you to use them.
Let's install an image called "postgres" that contains a PostgreSQL database server.

2. Go to the image homepage at:
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
docker run --rm --network host -it ubuntu:20.04
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
docker run --rm -p 5000:5000 my-python-webapp:latest
```

Inside docker playground click on the number "5000" to the right of the IP (next to Open Port button) to connect to your new service. You should see a new browser tab with the text "Hello, World!".

This is the text received from our simple flask app.








## Combine the two services using docker-compose
A docker swarm is a stack of multiple services that can run on one or multiple machines. We'll use a single machine to run a stack of two containers:

1. A DB container with our database

2. A webapp container with our web application (flask)

Let's start by creating a `docker-compose.yml` file with the following contents:

```
version: '3.8'

services:
  db:
    image: postgres:latest
    environment:
      POSTGRES_PASSWORD: docker
      POSTGRES_DB: wordcount_dev
      POSTGRES_USER: docker

  webapp:
    image: my-python-webapp:latest
    ports:
      - 5000:5000
```      


Then start a new swarm with your server as its manager with:

```
docker swarm init --advertise-addr eth1
```

The `--advertise-addr` is required because on the Docker playground servers have multiple IP addresses. This is the address used to communicate with other servers in the swarm.

Now that the swarm is ready we'll deploy the "stack" in it. A stack is described by the docker-compose.yml file we created. Each container in the stack can access services on all other containers.

Run:

```
docker stack deploy -c docker-compose.yml helloworld
```

And then verify your stack is up using:

```
docker stack services helloworld
```

The name "helloworld" is the name of the stack, and the stack contains 2 containers:

```
ID                  NAME                MODE                REPLICAS            IMAGE                     PORTS
7tf14uhpmx5z        helloworld_db       replicated          1/1                 postgres:latest           
gjw3p02q8wc5        helloworld_webapp   replicated          1/1                 my-python-webapp:latest   *:5000->5000/tcp
```



Ready to check your stack is working? Just click on the 5000 in the port list UI and verify you get a webapp saying "Hello, World!"









## Create a modern flask webapp that connects to a DB
But our task is not to run simpleapp.py but the real app.py, so let's get to it.

1. Go back to the project's directory and find the Dockerfile

2. Just when you are about to fix the Dockerfile, you recall a note from the developer:

> Yo mate you'll be so happy this time - I created a shell script that runs the app just like you requested the last time. It's called "start.sh"

3. Cool - so we just need to get the Dockerfile to run "start.sh" instead of the existing simpleapp.py.

4. Can you guess how? Did it work?






## Running start.sh

1. Modify the Dockerfile to run "start.sh" (I only change the last line):

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
CMD ["./start.sh"]
```

Build the image again:

```
docker build --tag=pydocker1-test .
```

Delete the container from the stack and deploy the new image:

```
docker stack rm helloworld
docker stack deploy -c docker-compose.yml helloworld
```

However when we connect to port "5000" all we get is an error message.

Can you understand what went wrong? Can you fix it?


















## Finding the problem

The error message said:

> sqlalchemy.exc.OperationalError: (psycopg2.OperationalError) could not connect to server: No such file or directory
> Is the server running locally and accepting
> connections on Unix domain socket "/var/run/postgresql/.s.PGSQL.5432"?

Looks like the server tried to connect to the DB but failed.

Usually database connection details are stored in an environment variable, and our app is no different. Locate the file `.env` in the project's home path and print it:

```
$ cat .env 
export APP_SETTINGS="config.DevelopmentConfig"
export FLASK_ENV="development"
export DATABASE_URL="postgresql:///wordcount_dev"
```

OK! So looks like `DATABASE_URL` is our problem.

The code tries to connect to a PostgreSQL database on the local server, BUT our postgresql is running on a different container.












## Fix and retry
Let's fix the startup script to ignore .env and use our `docker-compose.yml` file to set the correct values for environment variables. While at it - we'll also email our developer friend:

> Yo mate thanks for the "start.sh" file you made BUT actually that wasn't so helpful. Environment variables should be defined on each machine according to its environment and not stored in code (that kinda goes against the point).

Anyway back to work. Modify start.sh to be:

```
#!/bin/bash
python manage.py db upgrade
python manage.py runserver -h 0.0.0.0
```

Go back to docker-compose.yml and modify it to be:

```
version: '3.8'

services:
  db:
    image: postgres:latest
    environment:
      POSTGRES_PASSWORD: docker
      POSTGRES_DB: wordcount_dev
      POSTGRES_USER: docker

  webapp:
    image: my-python-webapp:latest
    environment:
      APP_SETTINGS: "config.DevelopmentConfig"
      FLASK_ENV: development
      DATABASE_URL: "postgresql://docker:docker@db/wordcount_dev"
    ports:
      - 5000:5000

```


Notice I changed `DATABASE_URL` to match the actual postgresql connection string on server "db". The name "db" is taken from the service name in docker-compose.yml file (in our example we have two services: `db` and `webapp`)

Rebuild the template and the stack and try again
















## App is alive ... but wait, something's not right

The application shows a form and asks us to put a URL in the form, but when I do and click "submit" I'll get this error message:

```


LookupError: 
**********************************************************************
  Resource [93mpunkt[0m not found.
  Please use the NLTK Downloader to obtain the resource:

  [31m>>> import nltk
  >>> nltk.download('punkt')
  [0m
  For more information see: https://www.nltk.org/data.html

  Attempted to load [93mtokenizers/punkt/PY3/english.pickle[0m

  Searched in:
    - '/root/nltk_data'
    - '/usr/local/nltk_data'
    - '/usr/local/share/nltk_data'
    - '/usr/local/lib/nltk_data'
    - '/usr/share/nltk_data'
    - '/usr/local/share/nltk_data'
    - '/usr/lib/nltk_data'
    - '/usr/local/lib/nltk_data'
    - './nltk_data/'
    - './nltk_data/'
    - ''
```


Say What? Didn't the developer check the code???

See if you can understand what went wrong and fix it.










## Finding the problem
Looks like we're missing some files that the developer has downloaded and forgot about it. The module nltk needs a dictionary and that dictionary needs to be downloaded separately before running the app.

We need to modify our Dockerfile to download the files while building the image.

Modify Dockerfile to be:

```
# Use an official Python runtime as a parent image
FROM python:3.8.3-buster

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# THIS LINE WAS ADDED
RUN python -m nltk.downloader punkt

ENV FLASK_ENV "development"

# Run app.py when the container launches
CMD ["./start.sh"]

```

Rebuild and deploy the stack to try again






## Not again...

This time when I deploy the service I can't even connect. Here's the error I got:

```
sqlalchemy.exc.ProgrammingError

sqlalchemy.exc.ProgrammingError: (psycopg2.errors.UndefinedTable) relation "results" does not exist
LINE 3: FROM results) AS anon_1
             ^

[SQL: SELECT count(*) AS count_1 
FROM (SELECT results.id AS results_id, results.url AS results_url, results.result_all AS results_result_all, results.result_no_stop_words AS results_result_no_stop_words 
FROM results) AS anon_1]
(Background on this error at: http://sqlalche.me/e/13/f405)
```

Wow a programming error! Where's that developer who said he has checked everything???

Can you find what's wrong and fix it?










## Finding the problem
This command prints all the standard output from the webapp container:

```
docker logs $(docker ps -f ancestor=my-python-webapp -q)
```

Scroll up and you'll find:

```
psycopg2.OperationalError: could not connect to server: Connection refused
        Is the server running on host "db" (10.0.7.5) and accepting
        TCP/IP connections on port 5432?
```
 
Cool! So now we know that the process tried to initialize the database BEFORE the database was up. That explains a lot, because if initialization failed then the table does certainly not exists.

One easy fix is to let start.sh wait a little before trying to initialize the database. Go back to the project and modify start.sh to be:

```
#!/bin/bash
sleep 5
python manage.py db upgrade
python manage.py runserver -h 0.0.0.0
```

Rebuild and deploy again to test




## Verify your webapp is running
Finally everything is working.

Click on the "5000" port, type in a URL and watch the table on the right with all the words from that URL.


## Research Questions

1. Can you think of a better way to wait for the database to be available?

2. Database is initialized every time we delete the stack and create it again. This means all our data is deleted on every startup. Do you know / Can you find how to save database data between stacks deployments ?

3. Database initialization happens every time we start our application server. Are you happy with this choice? Can you suggest an alternative?


## Thanks For Participating

Hope you had fun and learned a thing or two about docker. For future sessions please visit us at:
[https://www.tocode.co.il/workshops](https://www.tocode.co.il/workshops)
