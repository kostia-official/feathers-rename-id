const cloneDeep = require('lodash.clonedeep');
const assign = require('lodash.assign');
const map = require('lodash.map');

function renameField(oldIdName, newIdName) {
  return (data) => {
    if (!data) return;
    const result = cloneDeep(data);
    if (result[oldIdName]) {
      result[newIdName] = result[oldIdName];
      delete result[oldIdName];
    }
    return result;
  }
}

module.exports = (Service) => class extends Service {
  constructor(opts) {
    super(opts);
    this.newIdName = opts.newIdName || 'id';
  }

  find(params) {
    const input = this.renameInInput({ params });
    return super.find(input.params)
      .then((res) => {
        if (res.data) {
          res.data = this.renameInOutput(res.data);
        } else {
          res = this.renameInOutput(res);
        }
        return res;
      })
  }

  get(id, params) {
    const input = this.renameInInput({ params });
    return super.get(id, input.params)
      .then(this.renameInOutput.bind(this));
  }

  create(data, params) {
    const input = this.renameInInput({ data, params });
    return super.create(input.data, input.params)
      .then(this.renameInOutput.bind(this));
  }

  patch(id, data, params) {
    const input = this.renameInInput({ data, params });
    return super.patch(id, input.data, input.params)
      .then(this.renameInOutput.bind(this));
  }

  update(id, data, params) {
    const input = this.renameInInput({ data, params });
    return super.update(id, input.data, input.params)
      .then(this.renameInOutput.bind(this));
  }

  remove(id, params) {
    const input = this.renameInInput({ params });
    return super.remove(id, input.params)
      .then(this.renameInOutput.bind(this));
  }

  renameInInput({ params, data }) {
    const renameIn = renameField(this.newIdName, '_id');
    const _data = renameIn(data);
    const _params = assign({}, renameIn(params), { query: renameIn(params.query) });
    return { data: _data, params: _params };
  }

  renameInOutput(output) {
    const rename = renameField('_id', this.newIdName);
    if (Array.isArray(output)) return map(output, rename);
    return rename(output);
  }
};
