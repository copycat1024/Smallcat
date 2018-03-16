@echo off

echo Inspect database ...
python manage.py inspectdb > coreapp/models.py
echo Done.
echo .
echo Creating serializers and views
python manage.py shell -c "from smallcat import install; install.makeapp('coreapp')"
echo Done.
echo .
