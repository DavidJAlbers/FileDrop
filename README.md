# FileDrop
*FileDrop is a web service for sharing and downloading files and a simple to use URL shortener.*

It is written in Node.js with Express and EJS and uses lightweight JSON files for configuration.

With FileDrop, you can provide your users with so-called "file drops", collections of files, URLs or direct URL redirection that are reachable from a convenient URI and can be accessed via a minimalistic and customisable website. 

## Build & Deploy
The recommended deployment strategy is to **use Docker**.

At first, clone the repository to your building machine.
A `Dockerfile` for building FileDrop is included.
Then deploy the image locally or on your production server.

For configuration, the following files and directories should be mounted into the container:
- `/app/config/filedrops.json`: Specifies the file drops you want to register.
- `/app/config/options.json`: Sets global options for customisation.
- `/app/data/`: Root directory for the actual files you want to be reachable from the outside.

Example `docker-compose.yml`:

```yaml
version: "3.7"

services:
  filedrop:
    build: your/path/to/repo/clone
    ports:
      - "80:3000"  # The FileDrop web server listens on port 3000
    volumes:
      - "filedrop-data:/app/data/"
      - "filedrop-cfg:/app/config/"

volumes:
  filedrop-data:
  filedrop-cfg:
```

## Configuration file format

### `filedrops.json`

In this file, you list all your file drops or URLs as a JSON array. Every element has to provide a `type` field and the following type specific fields:

#### Direct URL redirection

- `type` (has to be *direct_url*),
- `name` (will be used for the URI, has to be unique),
- `url` (the URL the user will be directed to).

#### URLs with redirection page and Files

- `type` (has to be *urls* or *files*)
- `name` (will be used for the file drops or URL lists URI, has to be unique), 
- `title` (a more descriptive name for your file drop or URL list that will be shown on the site),
- `meta` (additional information about the file drop or URL list as string array, may be empty), and
- `files` or `urls` (depends on the `type`, an array with the files or URLs to provide under this file drop or URL list, each with `name`, `type`, and `path` for files and `name` and `url` for URLs).

Example `filedrops.json`:

```json
[
  {
    "type": "files",
    "name": "demo",
    "title": "A demo file drop",
    "meta": [],
    "files": [
      {
        "name": "Test document for testing purposes",
        "type": "text file",
        "path": "your/path/relative/to/app/data"
      },
      {
        "name": "Audio demo file",
        "type": "MP3 file",
        "path": "your/path/relative/to/app/data"
      }
    ]
  },
  {
    "type": "files",
    "name": "raytracing",
    "title": "Presentation resources: \"The Raytracing algorithm\"",
    "meta": [
      "December 5th, 2019",
      "Mr. Speaker",
      "Place of presentation",
      "University of XXX"
    ],
    "files": [
      {
        "name": "Presentation slides",
        "type": "Keynote presentation",
        "path": "your/path/relative/to/app/data"
      }
    ]
  },
  {
    "type": "direct_url",
    "url": "https://youtube.com"
  },
  {
    "type": "urls",
    "name": "repositories",
    "title": "All Project Repositories",
    "meta": [],
    "urls": [
      {
        "name": "GitHub",
        "url": "https://github.com/your/repository"
      },
      {
        "name": "GitLab",
        "url": "https://gitlab.com/your/repository"
      }
    ]
  }
]
```

You could then reach the example file drops via `http://<your-domain.com>/demo` and `http://<your-domain.com/raytracing`, respectively.

In order for FileDrop to be able to locate your files, every file you intend to server must be placed inside the `/app/data` directory of the Docker container, and its `path` attribute in `filedrops.json` must be relative to this directory.
      
### `options.json`
In this file, you can specify further options to customise your FileDrop deployment.

Currently, only one option is supported, so an example `options.json` may look like this:

```json
{
  "branding": "Mr. Robert's FileDrop"
}
```

The `branding` will be shown in the web site's title, just after the file drop's title.

## Roadmap

- authentication features to secure access to certain file drops 
- "single" file drops that link directly to one single file without a fancy UI

