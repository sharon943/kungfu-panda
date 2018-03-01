

module.exports = {
  phone: abc
}

function abc(phone) {
  var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
  console.log(phone);
  if (!myreg.test(phone)) {
    
    return false;
  }else{
    return true;
  }
  callback();
}
