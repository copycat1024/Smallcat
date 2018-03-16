# Smallcat
Automatic REST frontend generator

## Setup instruction:
1. Specify connection to your database by editting smallcat/setting.py
2. Run setup.bat to generate REST frontend
3. Run runserver.bat to start server
4. Open <your_url>/static/view.html to view the smallcat frontend

**Note:** You will need to manually edit coreapp/models.py to edit the database.
By default, inspectdb creates unmanaged models.
That is, managed = False in the model’s Meta class tells Django not to manage each table’s creation, modification, and deletion.
If you do want to allow Django to manage the table’s lifecycle, you’ll need to change the managed option above to True.