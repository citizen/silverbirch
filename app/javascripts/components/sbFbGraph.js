var _ = require('lodash');

function SbFbGraph (fbRef, startNode, changeCallback) {
  var self = this;
  //console.log("sn - ", startNode);
  function walkGraph (nodeKey) {
    if (! (nodeKey in self)) {
      self[nodeKey] = {};
    }
    fbRef.child(nodeKey).on('value', function(dataSnapshot) {
      //console.log("here ", nodeKey);
      var node = dataSnapshot.val();
      self[nodeKey].key = dataSnapshot.key();
      self[nodeKey].properties = node.properties;
      self[nodeKey].relationships = node.relationships;
      //_.extend(self[nodeKey], node.noRef);
      //console.log("key - ", dataSnapshot.key());
      //console.log("val - ", dataSnapshot.val());
      _.forEach(node.relationships, function(n, relationship_type) {
        var relative_key = node.relationships[relationship_type];
        console.log("here - ", relative_key);
        //console.log("here - ", typeof relationship);
        //if (typeof relationship === "string") {
        //  // One to one
        //  //console.log("node." + relationship + " = ");
        //  walkGraph(node.sbRef[subKey]);
        //  self[nodeKey][subKey] = self[node.sbRef[subKey]];
        //} else if (typeof relationship === "object") {
        //}
      });
      changeCallback(self);
    }, function(error) {
      console.log(error);
    }, self);
  }
  walkGraph(startNode);
  changeCallback("one time");
}

module.exports = SbFbGraph;
