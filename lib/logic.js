'use strict';
/**
 * Add new student asset.
 * @param {edu.university.rajasthan.AddStudent} addStudentTransaction
 * @transaction
 */
function addStudent(addStudentTransaction) {
  var student = addStudentTransaction.newStudent;
  var client = addStudentTransaction.client;
  student.lastUpdated = new Date();
  return getAssetRegistry('edu.university.rajasthan.Student')
    .then(function (assetRegistry) {
      if (!assetRegistry.exists(student.univRoll)) {
        var studentAssetNotification = getFactory().newEvent('edu.university.rajasthan', 'AddStudentNotification');
        studentAssetNotification.student = student;
        studentAssetNotification.message = 'Student asset created by client id - ' + client.clientId + ' university roll - ' + student.univRoll;
        emit(studentAssetNotification);
        return assetRegistry.add(student);
      }
    });
}
/**
 * Update student asset info.
 * @param {edu.university.rajasthan.UpdateStudent} updateStudentTransaction
 * @transaction
 */
function updateStudent(updateStudentTransaction) {
  var client = updateStudentTransaction.client;
  var updatedStudent = updateStudentTransaction.student;
  updatedStudent.lastUpdated = new Date();
  return getAssetRegistry('edu.university.rajasthan.Student')
    .then(function (assetRegistry) {
      if (assetRegistry.exists(updatedStudent.univRoll)) {
        var studentAssetNotification = getFactory().newEvent('edu.university.rajasthan', 'UpdateStudentNotification');
        studentAssetNotification.student = updatedStudent;
        studentAssetNotification.message = 'Student asset updated by client id - ' + client.clientId + ' university roll - ' + updatedStudent.univRoll;
        emit(studentAssetNotification);
        return assetRegistry.update(updatedStudent);
      }
    });
}
/**
 * View student asset info.
 * @param {edu.university.rajasthan.ViewStudent} viewStudentTransaction
 * @transaction
 */
function viewStudent(viewStudentTransaction) {
  var univRoll = viewStudentTransaction.univRoll;
  return getAssetRegistry('edu.university.rajasthan.Student')
    .then(function(assetRegistry){
      var student=assetRegistry.get(univRoll);
      if(student) {
        return student;
      }
    });
}