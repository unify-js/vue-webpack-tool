# Why Vue Webpack Tool

## Motivation

Due to the current preference for Vite as the official build tool for Vue projects, the vue-cli-service, which is the official build tool based on Webpack, is now in maintenance mode.

This implies that new features related to webpack will not be added to vue-cli-service, particularly those focused on enhancing the development experience, such as lazy compilation. Lazy compilation is a feature that allows you to compile only the files you are actively working on, resulting in significant reduction in compilation time.

Although many existing Vue projects still utilize vue-cli-service, the development experience is often unsatisfactory. Additionally, migrating to Vite requires substantial effort due to historical reasons. Therefore, the objective of this project is to provide an improved development experience for Vue projects originally built with vue-cli-service or webpack, while minimizing the migration effort required.

## Features

The Vue Webpack Tool prioritizes the development experience and offers several features including:

- Lazy compilation
- DLL (Dynamic Link Library)
- Cache

The tool includes built-in caching functionality, and both lazy compilation and DLL features are optional. You can enable lazy compilation and DLL by passing specific options to the CLI command.
