TABLE_M = {};

TABLE_M._init = function(data){
	function Table(k, url){
		this.url = url;
		this.name = k;
		this.loaded = false;

		this.load = function(result){
			this.meta = this._clean_meta(result.meta);
			this.data = this._clean_data(result.data, this.meta);
			this.loaded = true;
			return this.name;
		}

		this._clean_meta = data => {
			res = {"keys" : [], "type" : [], "relation" : []};
			_.map(data.table.fields, f => {
				res.keys.push(f.name);
				res.type.push(f.type);
				if (f.is_relation)
					res.relation.push(res.keys.length-1);
			});
			res.pk = _.indexOf(res.keys, data.table.pk);
			return res;
		}

		this._clean_data = (data, meta) => {
			res = [];
			_.each(data, row => {
				r = [];
				for (i=0; i<meta.keys.length; i++){
					if (i == meta.pk){
						r.push(this._key_from_url(row.url));
					} else if (meta.relation.includes(i)) {
						r.push(this._key_from_url(row[meta.keys[i]]));
					} else {
						r.push(row[meta.keys[i]]);
					}
				}
				res.push(r);
			});
			return res;
		}

		this._key_from_url = str => {
			var l = str.split("/");
			return l[l.length-2];
		};
	}

	this._list = [];
	_.map(data, (v,k) => {
		this._list.push(k);
		this[k] = new Table(k, v);
	});
}