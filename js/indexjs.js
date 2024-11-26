
const apiUrl = new URL("http://127.0.0.1:14050/search/customer");
async function fetchData(gender, age) {
    try {
        // 쿼리 파라미터 추가 (한글 데이터 인코딩)
        const queryParams = new URLSearchParams({
            gender: gender,
            ageGroup: age,
        }).toString();

        const url = `${apiUrl}?${queryParams}`;

        // GET 요청 보내기
        const response = await fetch(url);

        // 응답 처리
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Response Data:", data);
        return data; // 필요한 경우 반환
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function submitSelection() {
    const gender = document.querySelector('input[name="gender"]:checked')?.value;
    const ageGroup = document.querySelector('input[name="ageGroup"]:checked')?.value;

    if (gender && ageGroup) {
        // alert(`선택한 성별: ${gender}, 선택한 나이대: ${ageGroup}`);
        fetchData("남", "30대")
    } else {
        alert("성별과 나이대를 모두 선택해 주세요!");
    }
}

function renderData(users) {
    const container = document.getElementById("userList");
    container.innerHTML = ""; // 기존 내용 초기화

    users.forEach(user => {
        const listItem = document.createElement("li");
        listItem.textContent = `${user.name} - ${user.email}`;
        container.appendChild(listItem);
    });
}