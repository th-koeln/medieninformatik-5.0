/* Prüfungsleistungen einfach
############################################################################ */

exports.resolveExamInfoSimple = (examInfo) => {

  const formatExamItem = (examInfo, type) => {
    if(!examInfo[type]) return false;
    return `${examInfo[type].art}`;
  }

  const extractExamInfo = (examInfo) => {

    const einzelleistung = examInfo['Einzelleistung']
      ? formatExamItem(examInfo, 'Einzelleistung')
      : false;

    const teamleistung = examInfo['Teamleistung']
      ? formatExamItem(examInfo, 'Teamleistung')
      : false;

    const combined = [einzelleistung, teamleistung].filter(Boolean).join(' sowie ');

    return `
      ${combined}
    `;
  };

  return extractExamInfo(examInfo);
};


