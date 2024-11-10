const apiUrl = '';

const checkUserAuth = async () => {
    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (response.ok) {
            const data = await response.json();
            if (data.user) {
                location.replace("./main/index.html");
            } else {
                console.log('Người dùng không đăng nhập');
            }
        } else {
            console.error('Lỗi khi lấy thông tin người dùng:', response.status);
        }
    } catch (error) {
        console.error('Có lỗi xảy ra:', error);
    }
};

checkUserAuth();
