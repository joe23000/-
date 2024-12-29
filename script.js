// بيانات المستخدمين
const users = [
    { username: "admin", password: "admin123", role: "admin" },
    { username: "employee", password: "employee123", role: "employee" }
];

let currentUser = null; // المستخدم الحالي
const inventory = []; // بيانات الجرد

// تسجيل الدخول
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        currentUser = user;
        document.body.classList.add(user.role);
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('app').style.display = 'block';
    } else {
        document.getElementById('login-error').style.display = 'block';
    }
});

// تسجيل الخروج
document.getElementById('logout-button').addEventListener('click', () => {
    currentUser = null;
    document.body.className = '';
    document.getElementById('app').style.display = 'none';
    document.getElementById('login-section').style.display = 'block';
});

// إضافة عنصر جديد
document.getElementById('item-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('item-name').value;
    const quantity = parseInt(document.getElementById('item-quantity').value);
    const location = document.getElementById('item-location').value;

    inventory.push({ name, quantity, location });
    renderInventory();
    updateStatistics();
    e.target.reset();
});

// عرض العناصر في الجرد
function renderInventory() {
    const inventoryList = document.getElementById('inventory-list');
    inventoryList.innerHTML = '';

    inventory.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>${item.location}</td>
            <td class="admin-only"><button onclick="removeItem(${index})">حذف</button></td>
        `;
        inventoryList.appendChild(row);
    });
}

// حذف عنصر
function removeItem(index) {
    inventory.splice(index, 1);
    renderInventory();
    updateStatistics();
}

// تحديث الإحصائيات
function updateStatistics() {
    const totalItems = inventory.length;
    const totalQuantity = inventory.reduce((sum, item) => sum + item.quantity, 0);

    document.getElementById('total-items').textContent = totalItems;
    document.getElementById('total-quantity').textContent = totalQuantity;
}

// بيانات وهمية للعناصر
const fakeData = [
    { name: "طاولة خشبية", quantity: 5, location: "المستودع A" },
    { name: "كرسي جلد", quantity: 10, location: "القسم B" },
    { name: "مكتب معدني", quantity: 3, location: "الزاوية C" },
    { name: "خزانة ملابس", quantity: 2, location: "المستودع D" },
    { name: "سرير مزدوج", quantity: 4, location: "المنطقة E" },
    { name: "ثلاجة صغيرة", quantity: 6, location: "القسم F" },
    { name: "ميكروويف", quantity: 8, location: "المستودع G" },
    { name: "كمبيوتر مكتبي", quantity: 2, location: "القسم H" },
    { name: "طابعة ليزرية", quantity: 1, location: "المكتب الرئيسي" },
    { name: "مصباح LED", quantity: 15, location: "القسم J" }
];

// تحميل البيانات الوهمية عند فتح الصفحة
window.onload = () => {
    inventory.push(...fakeData); // إضافة البيانات الوهمية إلى الجرد
    renderInventory(); // عرض الجرد
    updateStatistics(); // تحديث الإحصائيات
};