from rest_framework.metadata import BaseMetadata
import inspect 

class GetMetadata(BaseMetadata):
    """
    Don't include field and other information for `OPTIONS` requests.
    Just return the name and description.
    """
    def determine_metadata(self, request, view):
		try:
			m = {
				'classname': view.__class__.__name__,
				'name': view.get_view_name(),
				'description': view.get_view_description(),
			}
			model = view.serializer_class.Meta.model

			m['pk'] = model._meta.pk.name
			m['fields'] = []
			for f in model._meta.get_fields():
				m['fields'].append({
					"name": f.name,
					"type": f.get_internal_type(),
				});

			return m
		except Exception as err:
			return {
				'name': view.get_view_name(),
				'description': view.get_view_description(),
				'err': str(err),
			}