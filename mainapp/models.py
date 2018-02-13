# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.

class Teacher(models.Model):
	forename = models.CharField(max_length=45)
	surname  = models.CharField(max_length=45)
	username = models.CharField(max_length=45, primary_key=True)
	email    = models.CharField(max_length=45)
	
	def __str__(self):
		return self.forename + ", " + self.surname

class Course(models.Model):
	name     = models.CharField(max_length=45)
	group    = models.CharField(max_length=45)
	teacher  = models.ForeignKey(Teacher)
