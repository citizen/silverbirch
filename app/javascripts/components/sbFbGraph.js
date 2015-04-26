var _ = require('lodash');

function SbFbGraph (fbRef, startNode, changeCallback) {
  var self = this;
  function walkGraph (nodeKey) {
    if (! (nodeKey in self)) {
      self[nodeKey] = {};
      fbRef.child(nodeKey).on('value', function(dataSnapshot) {
        var node = dataSnapshot.val();
        self[nodeKey].key = dataSnapshot.key();
        self[nodeKey].properties = node.properties;
        self[nodeKey].relationships = node.relationships;
        _.forEach(node.relationships, function(n, relationship_type) {
          var relative_key = node.relationships[relationship_type];
          if (typeof relative_key === "string") {
            // One to one
            walkGraph(relative_key);
            node.relationships[relationship_type] = self[relative_key];
          } else if (typeof relative_key === "object") {
            // One to many
            var relative_keys = relative_key;
            node.relationships[relationship_type] = _.map(relative_keys, function(value, relative_key, collection) {
              walkGraph(relative_key);
              return self[relative_key];
            });
          }
        });
        changeCallback(self, self[nodeKey]);
      }, function(error) {
        console.log(error);
      }, self);
    }
  }
  walkGraph(startNode);
}

module.exports = SbFbGraph;
