# A simple program to convert all the jsdoc comments to markdown
import os
import shutil

os.chdir("../../src")
for file in os.listdir("./"):
    if file.endswith(".js") and file != "p5.js":
        os.system("jsdoc2md {0} >> {0}.md".format(file))
        shutil.move("{0}.md".format(file), "../docs/{0}.md".format(file))

os.chdir('../')
os.system("mkdocs build")
if os.path.isdir('docs-site'):
    shutil.rmtree('docs-site')
shutil.move('site', 'docs-site')
