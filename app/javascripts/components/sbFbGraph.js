var _ = require('lodash');

function SbFbGraph (fbRef, startNode, changeCallback) {
  var graph = {};

  function walkGraph (nodeKey) {
    if ( !(nodeKey in graph) ) {
      graph[nodeKey] = {};

      fbRef.child(nodeKey).on('value', function(dataSnapshot) {
        var node = dataSnapshot.val();
        if ( !node ) { return false; }

        graph[nodeKey].key = dataSnapshot.key();
        graph[nodeKey].properties = node.properties;
        graph[nodeKey].relationships = node.relationships;

        _.forEach(node.relationships, function(n, relationship_type) {
          var relative_key = node.relationships[relationship_type];

          if (typeof relative_key === "string") {
            // One to one
            walkGraph(relative_key);
            node.relationships[relationship_type] = graph[relative_key];
          } else if (typeof relative_key === "object") {
            // One to many
            var relative_keys = relative_key;
            _.forOwn(relative_keys, function(value, relative_key) {
              walkGraph(relative_key);
              node.relationships[relationship_type][relative_key] = graph[relative_key];
            });
          }
        });

        changeCallback(graph, graph[nodeKey]);
      },
      function(error) {
        console.log(error);
      }, self);
    }
  }

  walkGraph(startNode);
}

module.exports = SbFbGraph;
