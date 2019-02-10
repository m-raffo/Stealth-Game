# A simple program to convert all the jsdoc comments to markdown
import os
import shutil

os.chdir("../../")
for file in os.listdir("./"):
    if file.endswith(".js") and file != "p5.js":
        os.system("jsdoc2md {0} >> {0}.md".format(file))
        shutil.move("{0}.md".format(file), "docs/{0}.md".format(file))

os.system("mkdocs build")
