
function SbFbGraph (fbRef, startNode, changeCallback) {
  var self = this;
  function walkGraph (node) {
    fbRef.child(startNode).on('value', function(dataSnapshot) {
      var node = dataSnapshot.val()
      self[startNode] = node;
      changeCallback(self);
    }, function(error) {
      console.log(error);
    }, self);
  }
  walkGraph(startNode);
  changeCallback("one time");
}

module.exports = SbFbGraph;
