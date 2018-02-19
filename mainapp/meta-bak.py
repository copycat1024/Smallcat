from rest_framework.metadata import BaseMetadata
import inspect, types

def make_view_meta(view):
	w = {
		'classname': view.__class__.__name__,
		'name': view.get_view_name(),
		'description': view.get_view_description(),
		'allow_methods': view.allowed_methods,
	}
	return w

def make_table_meta(view):
	try:
		model = view.serializer_class.Meta.model
		m = {}
		m['pk'] = model._meta.pk.name
		m['fields'] = [make_field(f) for f in model._meta.get_fields() if f.concrete]
		return m
	except Exception as err:
		return {
			'err': str(err),
		}

def make_field(f):
	r = {}
	m = [(k, v) for (k, v) in inspect.getmembers(f) if isJSONable(v)]
	for k, v in m:
#		if k in []:
		if k[:1]!='_':
			r[k] = v
	r["type"] = f.get_internal_type()
	return r

def make_meta(view):
	return {
		'view' : make_view_meta(view),
		'table': make_table_meta(view),
	}

class GetMetadata(BaseMetadata):
    """
    Don't include field and other information for `OPTIONS` requests.
    Just return the name and description.
    """
    def determine_metadata(self, request, view):
		try:
			return make_meta(view)
		except Exception as err:
			return {
				'err': str(err),
			}

def tts(v):
	return type(v).__name__

def ltts(l):
	return [{
		'name': k,
		'type': tts(v),
	} for (k,v) in l]
	
def ltts1(l):
	return [k for (k,v) in l]

def isJSONable(v):
#	return isinstance(v, types.ListType) or isinstance(v, types.DictType) or isinstance(v, bool) or isinstance(v, basestring) or v is None
	return (isinstance(v, bool) and v) or (isinstance(v, basestring) and v != "")

def disect_obj(obj):
	r = {}
	m = inspect.getmembers(obj)

	spc = [(k, v) for (k, v) in m if k[:2]=="__"]
	m = [(k, v) for (k, v) in m if (k, v) not in spc]

	pri = [(k, v) for (k, v) in m if k[:1]=="_"]
	m = [(k, v) for (k, v) in m if (k, v) not in pri]

	cls = [(k, v) for (k, v) in m if inspect.isclass(v)]
	m = [(k, v) for (k, v) in m if (k, v) not in cls]
	
	lst = [(k, v) for (k, v) in m if isinstance(v, types.ListType)]
	m = [(k, v) for (k, v) in m if (k, v) not in lst]

	dct = [(k, v) for (k, v) in m if isinstance(v, types.DictType)]
	m = [(k, v) for (k, v) in m if (k, v) not in dct]

	bol = [(k, v) for (k, v) in m if isinstance(v, bool)]
	m = [(k, v) for (k, v) in m if (k, v) not in bol]

	str = [(k, v) for (k, v) in m if isinstance(v, basestring)]
	m = [(k, v) for (k, v) in m if (k, v) not in str]

	nul = [(k, v) for (k, v) in m if v is None]
	m = [(k, v) for (k, v) in m if (k, v) not in nul]

	met = [(k, v) for (k, v) in m if inspect.ismethod(v)]
	m = [(k, v) for (k, v) in m if (k, v) not in met]

	r['met'] = ltts1(met)
	r['cls'] = ltts1(cls)
	r['lst'] = ltts1(lst)
	r['dct'] = ltts1(dct)
#	r['spc'] = ltts1(spc)
	r['bol'] = ltts1(bol)
	r['str'] = ltts1(str)
	r['nul'] = ltts1(nul)
#	r['pri'] = ltts1(pri)
	r['m'] = ltts(m)
	return r
