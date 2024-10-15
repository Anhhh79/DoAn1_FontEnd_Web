function runScripts() {
    // Tìm tất cả các thẻ script trong nội dung mới
    var scripts = document.querySelectorAll('#content script');
    scripts.forEach(function (script) {
        // Tạo một thẻ script mới
        var newScript = document.createElement('script');
        if (script.src) {
            newScript.src = script.src;  // Nếu script có src, gán src
        } else {
            newScript.textContent = script.textContent;  // Nếu script có nội dung, gán nội dung
        }
        document.body.appendChild(newScript); // Thêm thẻ script vào body để thực thi
    });
}

function loadContent(url) {
    var xhr = new XMLHttpRequest();  // Tạo đối tượng XMLHttpRequest

    xhr.open('GET', url, true);  // Thiết lập yêu cầu GET tới URL

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                // Khi yêu cầu hoàn tất và thành công, thay đổi nội dung
                document.getElementById('content').innerHTML = xhr.responseText;
                runScripts(); // Gọi hàm để chạy các script
            } else {
                // Xử lý lỗi nếu không tải được trang
                document.getElementById('content').innerHTML = "<p>Failed to load content. Please try again.</p>";
            }
        }
    };

    xhr.send();  // Gửi yêu cầu AJAX
}

// Bắt lỗi nút thêm
document.getElementById('btnEdit').addEventListener('click', function (e) {
    // Ngăn form submit nếu có lỗi
    e.preventDefault();

    // Đặt biến để kiểm tra hợp lệ
    let isValid = true;

    // Reset các thông báo lỗi trước khi kiểm tra
    document.querySelectorAll('.error').forEach(function (el) {
        el.textContent = '';
    });

    // Biểu thức chính quy để kiểm tra ký tự đặc biệt
    const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/;

    // Kiểm tra Họ và Tên
    const fullname = document.getElementById('editFullname').value.trim();
    if (fullname === '') {
        document.getElementById('EditNameError').textContent = 'Họ và Tên không được để trống';
        isValid = false;
    } else if (specialCharPattern.test(fullname)) {
        document.getElementById('EditNameError').textContent = 'Họ và Tên không được chứa ký tự đặc biệt';
        isValid = false;
    }

    // Kiểm tra Giới tính
    const gender = document.getElementById('editGender').value;
    if (gender === '') {
        document.getElementById('EditgenderError').textContent = 'Vui lòng chọn giới tính';
        isValid = false;
    }

    // Kiểm tra Căn cước công dân (CCCD)
    const cccd = document.getElementById('editCCCD').value.trim();
    if (cccd === '') {
        document.getElementById('EditcccdError').textContent = 'Căn cước công dân không được để trống';
        isValid = false;
    } else if (!/^\d{12}$/.test(cccd)) {
        document.getElementById('EditcccdError').textContent = 'Căn cước công dân phải gồm 12 chữ số';
        isValid = false;
    }

    // Kiểm tra Số điện thoại
    const phone = document.getElementById('editPhone').value.trim();
    if (phone === '') {
        document.getElementById('EditphoneError').textContent = 'Số điện thoại không được để trống';
        isValid = false;
    } else if (!/^\d{10}$/.test(phone)) {
        document.getElementById('EditphoneError').textContent = 'Số điện thoại phải gồm 10 chữ số';
        isValid = false;
    }

    // Kiểm tra Chức vụ
    const position = document.getElementById('editPosition').value;
    if (position === '') {
        document.getElementById('EditpositionError').textContent = 'Vui lòng chọn chức vụ';
        isValid = false;
    }

    // Kiểm tra Địa chỉ
    const address = document.getElementById('editAddress').value.trim();
    if (address === '') {
        document.getElementById('EditaddressError').textContent = 'Địa chỉ không được để trống';
        isValid = false;
    } else if (specialCharPattern.test(address)) {
        document.getElementById('EditaddressError').textContent = 'Địa chỉ không được chứa ký tự đặc biệt';
        isValid = false;
    }

    // Kiểm tra Ảnh
    const imageInput = document.getElementById('imageInput');
    if (imageInput.files.length === 0) {
        document.getElementById('EditimageError').textContent = 'Vui lòng chọn ảnh';
        isValid = false;
    }

    // Nếu tất cả các trường đều hợp lệ, tiếp tục xử lý
    if (isValid) {
        console.log('Dữ liệu hợp lệ. Bạn có thể tiến hành các bước tiếp theo.');
        // Thực hiện các hành động tiếp theo, ví dụ như gửi form hoặc gọi API
        // document.getElementById('editForm').submit(); // Nếu có form
    } else {
        console.log('Có lỗi trong dữ liệu nhập vào.');
    }
});
