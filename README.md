# theta
Use shortcuts to type words or templates - OPT_C => "console.log("


To add shortcuts just open the user preferences file (Under Brackets or Debug Menus).

You will see this:

    "theta.shortcuts": {
        "OPT_T": "ϴ",
        "CMD_OPT_CTRL_H": "html-template",
        "OPT_H": "hello world",
        "OPT_C": "console.log("
    }

This means that when you press OPT_T, it will print ϴ (theta);    
The html template prints an empty html template (instead of the string "html-template")    
You can add any commands you want. (some shortcuts wont work)



Notes:

-If you change what is typed, but not the keys you enter ("OPT_T"), you have to reset brackets for it to register.

-If you delete a shortcut, you need to reload brackets for it to register.

-To reset Brackets: (Debug->Reload With Extensions)

-If you want to add a template, it will be easier to go into the extension file and do it there as opposed to the preferences file. Just add the template you want to the shortcuts object, heres the example for the html template (use backticks to keep formatting):

```
shortcuts.CMD_OPT_CTRL_H = 
`<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title></title>
</head>

<body>

</body>

</html>`;
```
