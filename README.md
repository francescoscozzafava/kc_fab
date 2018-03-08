# per installare manualmente 
npm install express
npm install gulp
npm install gulp-rename
npm install gulp-js-minify
# per installare automaticamente 
posizionarsi sul file package.json e lanciare:
npm install 
# per creare il min
gulp minify-js







# KC FAB

KC FAB is a jQuery plugin to create materialize floating action button easily.

### Version
1.2

### DEMO

- [jsfiddle demo]
- Thank you for [jqueryscript.net] to provide another usage [example] for my plugin


### How to use

First of all, you need to have a DOM element to hold action buttons:
e.g
```html
<div class="kc_fab_wrapper" ></div>
```
Then in your script, calling the kc_fab on your DOM element.
You can pass in an object array as option to tell the plugin the buttons style and the anchors' link.
```js
var links = [
                {   /* The first object will be the main button */
                    "bgcolor":"red",
                    "icon":"+"
                },
                /* Following are the hidden button list */
                {
                    "url":"http://www.example.com",
                    "bgcolor":"red",
                    "color":"#fffff",
                    "icon":"<i class='fa fa-phone'></i>",
                    "target":"_blank"
                },
                {
                    "url":"http://www.example.com",
                    "bgcolor":"black",
                    "color":"white",
                    "icon":"<i class='fa fa-music'></i>",
                    "id":"id_item"
                }
                , /*ADDED:
                 1) NEW CONFIGURATION OPTION, 'fn' that take the name of the function declared in the global scope
                 2) NEW CONFIGURATION OPTION, 'alwaysOn' that set new style that make always visible the title
                 3) NEW CONFIGURATION OPTION, 'cssClass' that bring into component existing style like bootstrap , if you use this, bgcolor doesn't have effect on the button */

                    {
                        "url":"http://www.example.com",
                        "bgcolor":"blue",//<--- '' if cssClass
                        "color":"white",
                        "icon":"<i class='fa fa-code-fork' aria-hidden='true'></i>",
                        "title":"Javascript function Hey again, Click!",
                        "fn":"clickfunction",
                        "titleAlwaysOn":true,
                        "cssClass":'btn btn-primary'
                    }
            ]
$('.kc_fab_wrapper').kc_fab(links);
```

### Install by [Bower]
```nodejs
bower install kc_fab_4lld0n3
```

License
----

Copyright (c) 2015 Mark Luk Licensed under the [MIT license].

[jsfiddle demo]: https://jsfiddle.net/katrinluk/8wxho9cw/3/
[jqueryscript.net]: http://www.jqueryscript.net/menu/Material-Design-Floating-Action-Button-with-jQuery-KC-FAB.html
[example]: http://www.jqueryscript.net/demo/Material-Design-Floating-Action-Button-with-jQuery-KC-FAB/
[Bower]: http://libraries.io/bower/kc_fab
[MIT license]: https://github.com/katrincwl/kc_fab/blob/master/LICENSE
