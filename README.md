# Medieninformatik 5.0

Nutzt [11ty](https://www.11ty.dev) für die strukturierte Ablage von Content.

## Status von Dokumenten

| Kürzel | Bedeutung | Was ist zu tun? |
| ---- | ---- | ---- |
| tbd | to be done | loslegen! |
| wip | in Arbeit | nix |
| rfreview | Wartet auf Review | Review machen |
| review | im Review | nix |
| refactor | Überarbeitung erforderlich | bitte überarbeiten |
| ok | Fertig | nix |

## Ordnerstruktur

### `/docs`
kompilierter Code … do not touch 👻


### `/src` hier wird entwickelt

```
_layouts                           Templates
assets                             SCSS, Skripts, Fonts, etc … alles was kein Content ist
compiled-assets                    Kompilierte Dateien, z.B. CSS
modulbeschreibungen-bachelor-bpo5  Modulbeschreibungen Bachelor
modulbeschreibungen-master-mpo5    Modulbeschreibungen Master
kurzbericht                        Snippets Kurzbericht
```

### Weitere Dateien
```
.eleventy.js        Config von 11ty
.eleventyignore     Welche Folder/ Files soll 11ty ignorieren?
.eslintrc.json      
.gitignore          
.stylelintrc.json   
```

## Funktionen

`npm install`
`npm run build` 
`npm run dev` 