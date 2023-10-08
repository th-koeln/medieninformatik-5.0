/* Status anzeigen
############################################################################ */

exports.showStatus = (status) => {
  return status ? `<span class="status icon icon--inline" title="Work in Progress">rotate_right</span>` : '';
};