# ALVAN-V4

## Local Development
### Running ALVAN
#### Build
Run `docker-compose build` to build server and client

To build without the cache run the previous command with the `--no-cache` flag

#### Run
Run `docker-compose up` to run server and client

#### Specifying Service
To build and/or run just the server **or** the client add the corresponding docker service name after the command

server: `alvan-server`

client: `alvan-hub-ui`

**EXAMPLE**

Building the server without the cache
```docker-compose build --no-cache alvan-server```