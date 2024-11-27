
const apiUrl = new URL("http://company.i-bricks.co.kr:11385/search");

function submitSelection() {
    const gender = document.querySelector('input[name="gender"]:checked')?.value;
    const ageGroup = document.querySelector('input[name="ageGroup"]:checked')?.value;
    const mainCategory = document.querySelector('input[name="mainCategory"]:checked')?.value;
    const level = document.querySelector('input[name="level"]:checked')?.value;

    // if (gender && ageGroup) {
        // alert(`선택한 성별: ${gender}, 선택한 나이대: ${ageGroup}`);
        const data = fetchData(gender, ageGroup, mainCategory, level)
        // console.log("Response in submitSelection :", data);
    // } else {
        // alert("성별과 나이대를 모두 선택해 주세요!");
    // }
}

async function fetchData(gender, age, mainCategory, level) {
    try {
        // 쿼리 파라미터 추가 (한글 데이터 인코딩)
        const queryParams = new URLSearchParams({
            // gender: gender,
            // ageGroup: age,
            // mainCategory: mainCategory,
            // level: level
            gender: "남",
            ageGroup: "30대",
            mainCategory: "배송",
            level: "초급"
        }).toString();

        const url = `${apiUrl}/customer?${queryParams}`;

        console.log(`req.url = ${url}`)
        // GET 요청 보내기
        const response = await fetch(url);

        // 응답 처리
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        // console.log("data :", data);
        console.log("data[0] :", data[0].customerInfo);
        
        updateCustomerInfo(data[0].customerInfo);
        startPopup(data[0].popup);

        return data; // 필요한 경우 반환
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function updateCustomerInfo(customerInfo){
    // console.log(`item = ${item.customerName}`);
    const ul = document.querySelectorAll("#ul-customer-info li");

    ul.forEach(item => {
        const key = item.getAttribute("title");
        const prefix = item.textContent.split(":")[0] + " : ";
        item.textContent = `${prefix}${customerInfo[key]}`;
    });
}

function startPopup(item){
    const isConfirmed = confirm(item.content);
    if (isConfirmed) {
        alert("작업을 진행합니다.");
    } else {
        alert("작업이 취소되었습니다.");
    }
}