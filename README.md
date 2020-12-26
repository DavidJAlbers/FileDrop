# FileDrop
*FileDrop is a web service for sharing files and links with the world.*

It is written in Node.js with Express and EJS and uses lightweight JSON files for configuration.

With FileDrop, you can provide your users with so-called "collections" of files and links that are reachable via a convenient URL and can be accessed using a minimalistic and customisable website. 
URL shortening with instant redirect is also supported.

## Build & Deploy
The recommended deployment strategy is to **use Docker**.

At first, clone the repository to your building machine.
A `Dockerfile` for building FileDrop is included.
Then deploy the image locally or on your production server.

For configuration, the following files and directories should be mounted into the container:
- `/app/config/filedrops.json`: Specifies the collections you want to register.
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

In this file, you list all your desired collections as a JSON array. Each entry has to provide the following fields:

- `name` (this will be used for the collection's URL and must therefore be unique across all entries)
- `title` (a more descriptive name for your collection that will be shown on the site)
- `meta` (additional information about the collection as string array, optional)
- `elements` (an array with the files or links to provide under this collection, each with a `title`, and with a `path` for files and a `url` for links)

When listing files in `elements`, an additional `type` field may be specified to indicate the human-readable type of file that is provided (e.g. "PDF document").

An entry in `filedrops.json` with only a `name` and a `url` field (that is, without `title`, `meta`, or `elements`) is regarded as an instant redirection for convenient URL shortening.

Example `filedrops.json`:

```json
[
  {
    "name": "demo",
    "title": "A demo file drop",
    "elements": [
      {
        "title": "Test document for testing purposes",
        "path": "your/path/relative/to/app/data"
      },
      {
        "title": "Audio demo file",
        "type": "MP3 audio",
        "path": "your/path/relative/to/app/data"
      },
      {
        "title": "A demo redirection",
        "url": "https://google.com"
      }
    ]
  },
  {
    "name": "raytracing",
    "title": "Presentation resources: \"The Raytracing algorithm\"",
    "meta": [
      "December 5th, 2019",
      "Mr. Speaker",
      "Place of presentation",
      "University of XXX"
    ],
    "elements": [
      {
        "title": "Presentation slides",
        "type": "Keynote presentation",
        "path": "your/path/relative/to/app/data"
      }
    ]
  },
  {
    "name": "yt",
    "url": "https://youtube.com/mrrobert"
  },
  {
    "name": "repos",
    "title": "All Project Repositories",
    "elements": [
      {
        "title": "GitHub",
        "url": "https://github.com/your/repository"
      },
      {
        "title": "GitLab",
        "url": "https://gitlab.com/your/repository"
      }
    ]
  }
]
```

With this configuration, you could reach the collections via `http://<your-domain.com>/demo`, `http://<your-domain.com/raytracing`, and `http://<your-domain.com/repos`, respectively. A direct URL redirection to a YouTube channel could be found under `http://<your-domain.com/yt`.

In order for FileDrop to be able to locate your files, every file you intend to serve must be placed inside the `/app/data` directory of the Docker container, and its `path` attribute in `filedrops.json` must be relative to this directory.
      
### `options.json`
In this file, you can specify further options to customise your FileDrop deployment.

Currently, only two options are supported, so an example `options.json` may look like this:

```json
{
  "branding": "Mr. Robert's FileDrop",
  "maintainer": "roberts.daniel@gmail.com"
}
```

The `branding` will be shown in the web site's title, just after the file drop's title.
The `maintainer` address will be given to the user in case an error occurs when serving collections. If no `maintainer` is specified, a generic "report to the webmaster" will be used instead.

## Roadmap

- authentication features to secure access to certain file drops 
- "single" file drops that link directly to one single file without a fancy UI
- localisation options
- CLI for easily adding new filedrops
