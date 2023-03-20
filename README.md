# Mini Static Thingy Wingy

Created with love by [Brecht De Ruyte](https://utilitybend.com/). For fun, and free to use for all.

## What's it about?

In a world full of frameworks, packages and guidelines, it's sometimes a bit of an overkill to use all of these frameworks. Sometimes you just want to create a simple page or a sandbox to play in.

The Mini Static Thingy Wingy was created with just one thing in mind: An easy setup for a simple HTML and CSS driven page. This could be a landing page, a small demo, or an HTML presentation.

By using Twig as a templating engine and PostCSS + Scss to handle the styling, it's a very simple setup. The Thingy is not meant to be _the next new thing_, it's meant to be mini, and static, to create something on the fly (wing it).

## How to run it

Make sure you have the latest node version installed. Simply download the main directory and run:

```
npm install
```

Now you are ready to build! To start watching you files for changes, run the following:

```
npm run dev
```

This will start the server at localhost:5000 and you'll already have a live reload on your index.twig file and your .scss file. In the next part, i'll go a bit more in-depth, but don't worry, it's easy...

When you're happy with your result and want to build this, just add the following command which will create a build folder at the root of you projects, with your HTML, CSS, JS files (and other assets):

```
npm run build:production
```

**Note:** The CSS is automatically injected before the closing of the head tag, while JS is automatically added before the closing of the body tag.

# How to build

## Creating template files

In the src folder of your project, you can find a **templates.json** file. When you first open the project, it will look like this:

```
[
    {
        "filename": "./index.html",
        "template": "./templates/index.twig"
    }
]
```

Whenever you want to create a new html file in your end build, you'll have to add another line. The first line is the output filename, and the second one is the input.

```
[
    {
        "filename": "./index.html",
        "template": "./templates/index.twig"
    },
    {
        "filename": "./my-new-file.html",
        "template": "./templates/original-new-file.twig"
    }
]
```

## Other commands

```
npm run build
```

Will build the files without minifying or combining CSS. This is a development output.

```
npm run watch
```

Will build the files without minifying or combining CSS and watch for changes, will rebuild on change. This is slower than running the dev server.

```
npm run install:demo
```

This will install some demo files with examples and start the server.  
**Be careful, as this WILL overwrite items in your src folder.**

# About the tech used

## Twig

[Twig](https://twig.symfony.com/) is a templating language by symfony. It's well known for it's implementations in Craft CMS and Drupal. Twig felt like the right choice for me because first of all, I'm used to it and second of all, it still feels like writing HTML

Twig also makes it easy to set variables for this Mini Static Thingy Wingy since it allows you to pass variables like so:

```
{% include "./partials/_navigation.twig", with { active: "home" } %}
```

## PostCSS

I love to play around with [PostCSS](https://postcss.org/) and all it has to offer. You can add your own custom packages in the **postcss.config.js** file at the root of the project.

In the production build, I added the [purgeCSS](https://purgecss.com/plugins/postcss.html) and [PostCSS Clean](https://github.com/leodido/postcss-clean) plugins, because they make sense to me, but if you'd rather see those go, you can always go into the config file and delete them.

## Pure simple Javascript

Because we want to keep it small and clean, besides... Vanilla JS is a lot of fun. I added Babel and some plugins to make life a bit more easy such as dynamic import and transform runtime.

# Extra tips and tricks

## Assets and subfolders for templates

When using relative paths to your tabs, it can get harder when you want to use subfolders. By default a variable is set in the **\_base.html** which sets the base path of assets to _"./assets/"_.

```
{% set assets = assets|default("./assets/") %}
```

When using subfolders it might get handy to update this variable to a new relative path such as:

```
{% set assets = "../assets/" %}
```

## Using translation files

You can upgrade the webpack config file to look for translation files in your folder.

**1. In you webpack, add the following line of code:**

```
let templatePages = _.map(pages, function(page) {
//new line of code below
let translation = require(path.resolve(__dirname, "src")+'/translations/lang.'+page.lang+'.json');
//...
```

**2. When creating a template add a language parameter for example:**

```
[
    {
      	"filename": "./index.html",
      	"template": "./templates/index.twig",
	    "lang": "en"
    },
    {
      	"filename": "./index-fr.html",
      	"template": "./templates/index.twig",
	    "lang": "fr"
    }
]
```

Now we will create two pages from the same template, which will look at a different translation file (eg:lang.fr.json and lang.en.json).

**3. Let's create those two translation files in src/translations and add a translation with the same key.**

**in translations/lang.en.json:**

```
{
  "hello": "Hello world"
}
```

**in translations/lang.fr.json:**

```
{
  "hello": "Bonjour le monde"
}
```

**4. In our \_base.twig template, we can now set a global variable:**

```
{% set t =  htmlWebpackPlugin.options.trans %}
```

**5. And in our extended templates we can just refer to those variables as such:**

```
{{ t.hello }}
```

You should now get an output with different files in different languages, using the same base template.
