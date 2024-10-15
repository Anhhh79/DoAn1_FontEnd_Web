// <!-- tra cuu dat phong -->
// <!-- input OTP -->
const otpInputs = document.querySelectorAll('.otp-field input');
otpInputs.forEach((input, index) => {
    input.addEventListener('input', (event) => {
        const value = event.target.value;
        if (value.length === 1) {
            if (index < otpInputs.length - 1) {
                otpInputs[index + 1].focus();
            }
        }
    });
});
// <!-- // Xóa giá trị của mỗi ô nhập -->
function clearOtpInputs() {
    const otpInputs = document.querySelectorAll('.otp-field input');
    otpInputs.forEach((input) => {
        input.value = '';
    });
}
// <!-- xoa sdt sao khi tra cuu -->
function clearPhoneNumber() {
    const NumberInput = document.getElementById('SoDienThoaiTraCuu');
    NumberInput.value = '';
}

// <!-- danh gia -->
// <!-- xoa du lieu -->
function clearDataAssessInput() {
    const inputFields = document.getElementsByClassName('Assess');
    Array.from(inputFields).forEach((input) => {
        input.value = '';
    });
}
// <!-- xoa so sao -->
function clearStarAssess() {
    const radioOptions = document.getElementsByClassName('star');
    Array.from(radioOptions).forEach((radio) => {
        radio.checked = false;
    });
}
//Kiem tra so dien thoai trong chuc nang tra cuu
function validatePhoneNumber() {
    // Lấy giá trị từ ô nhập liệu
    const phoneNumber = document.getElementById("SoDienThoaiTraCuu").value;

    // Kiểm tra nếu số điện thoại chưa được nhập
    if (!phoneNumber) {
        alert("Bạn chưa nhập số điện thoại!");
        return false;
    }

    // Biểu thức chính quy để kiểm tra định dạng số điện thoại
    const phoneRegex = /^0\d{9,10}$/;

    // Kiểm tra nếu số điện thoại không hợp lệ
    if (!phoneRegex.test(phoneNumber)) {
        alert("Số điện thoại không hợp lệ! Vui lòng nhập số điện thoại bắt đầu bằng 0 và có 10-11 chữ số.");
        return false;
    }
    else {
        const myModal = new bootstrap.Modal(document.getElementById('OTPTraCuu'));
        myModal.show();
    }
    return true;
}
//Kiem tra nhap otp trong chuc nang tra cuu
function checkOTPTraCuu() {
    const otpInputs = document.querySelectorAll('.otp-input');
    let biendem = 0;

    otpInputs.forEach(input => {
        if (input.value.trim()) { // Kiểm tra nếu ô nhập không trống
            biendem++;
        }
    });

    if (biendem != 6) {
        alert("Bạn cần nhập đầy đủ OTP gồm 6 số");
        return false;
    }
    else {
        // Đóng modal hiện tại 
        const currentModal = bootstrap.Modal.getInstance(document.getElementById('OTPTraCuu'));
        if (currentModal) {
            currentModal.hide(); // Ẩn modal hiện tại
        }

        // Hiển thị modal Lich Su
        const ModalLichSu = new bootstrap.Modal(document.getElementById('LichSuDatPhong'));
        ModalLichSu.show();
    }

    return true;
}
//ham xoa so dien thoại danh gia
function clearPhoneNumberDanhGia() {
    const NumberInput = document.getElementById('PhoneNumberAssess');
    NumberInput.value = '';
}
//Kiem tra nhap thong tin trong chuc nang danh gia
function validateAssessmentForm() {
    // Lấy giá trị của họ tên
    const fullName = document.getElementById('fullNameAssess').value.trim();

    // Lấy giá trị của số điện thoại
    const phoneNumber = document.getElementById('PhoneNumberAssess').value.trim();

    // Kiểm tra xem có radio nào được chọn cho phần đánh giá sao hay không
    const starRating = document.querySelector('input[name="rating"]:checked');

    // Biểu thức chính quy để kiểm tra số điện thoại (10 chữ số)
    const phoneRegex = /^[0-9]{10}$/;

    // Kiểm tra xem họ tên đã được nhập chưa
    if (fullName === "") {
        alert("Vui lòng nhập họ tên của bạn.");
        return false;
    }

    // Kiểm tra xem số điện thoại đã được nhập và hợp lệ chưa
    if (phoneNumber === "" || !phoneRegex.test(phoneNumber)) {
        alert("Vui lòng nhập số điện thoại hợp lệ (10 chữ số).");
        clearPhoneNumberDanhGia()
        return false;
    }

    // Kiểm tra xem người dùng có chọn số sao hay chưa
    if (!starRating) {
        alert("Vui lòng chọn số sao để đánh giá khách sạn.");
        return false;
    }
    const currentModal1 = bootstrap.Modal.getInstance(document.getElementById('modalDanhGia'));
    if (currentModal1) {
        currentModal1.hide(); // Ẩn modal hiện tại
    }

    // Nếu tất cả các trường hợp đều hợp lệ
    alert("Đã gửi đánh giá của bạn !");
    clearDataAssessInput();
    clearStarAssess();
    return true;
}

//trang thanh toán 
function CheckDataFormThanhToan() {
    const fullName = document.getElementById('fullNameThanhToan').value.trim();
    const phoneNumber = document.getElementById('PhoneNumberThanhToan').value.trim();
    const phoneNumber2 = document.getElementById('PhoneNumberThanhToan2').value.trim();
    const cccd = document.getElementById('cccdThanhToan').value.trim();
    const email = document.getElementById('EmailAddressThanhToan').value.trim();
    const checkbox = document.getElementById('checkDieuKhoanThanhToan');

    // Kiểm tra họ tên
    if (fullName === "") {
        alert("Vui lòng nhập họ tên của bạn.");
        return false;
    }
    

    // Kiểm tra số CCCD (12 chữ số)
    const cccdRegex = /^[0-9]{12}$/;
    if (!cccdRegex.test(cccd)) {
        alert("Số CCCD không hợp lệ! Vui lòng nhập số CCCD gồm 12 chữ số.");
        return false;
    }

    // Kiểm tra số điện thoại (10 chữ số)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
        alert("Số điện thoại không hợp lệ! Vui lòng nhập số điện thoại gồm 10 chữ số.");
        return false;
    }
    else{
        if(!(phoneNumber2 == phoneNumber)){
            alert("Số điện thoại nhập lại không đúng");
            return false;
        }
    }

    // Kiểm tra địa chỉ email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Địa chỉ email không hợp lệ! Vui lòng nhập địa chỉ email đúng định dạng.");
        return false;
    }

    // Kiểm tra nếu checkbox đã được chọn
    if (!checkbox.checked) {
        alert("Bạn cần đồng ý với điều khoản đặt phòng trước khi tiếp tục.");
        return false;
    } 

    alert("Tất cả thông tin đều hợp lệ.");
    return true;

}

//kiem tra ki tu dac biet
function containsSpecialCharacters(str) {
    // Biểu thức chính quy kiểm tra ký tự đặc biệt
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/g;

    // Kiểm tra và trả về true nếu có ký tự đặc biệt, ngược lại false
    return specialCharRegex.test(str);
}
