# CLI

## Start a development server

### Usage

```bash
vue-webpack-tool start [options]
```

### Options

| Options | Description                                                   |
| ------- | ------------------------------------------------------------- |
| --dll   | Use the dll file. You must be already generated dev DLL files |
| --lazy  | use lazy compilation                                          |

## Build for production

### Usage

```bash
vue-webpack-tool build [options]
```

### Options

| Options | Description                                                    |
| ------- | -------------------------------------------------------------- |
| --dll   | Use the dll file. You must be already generated prod DLL files |

## Generate DLL files

### Usage

```bash
vue-webpack-tool dll [options]
```

### Options

| Options | Description                                         |
| ------- | --------------------------------------------------- |
| --dev   | generate DLL file for development. (default option) |
| --prod  | generate DLL file for production.                   |

## Clear all generated files

### Usage

```bash
vue-webpack-tool clear
```
