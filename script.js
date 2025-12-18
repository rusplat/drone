document.addEventListener('DOMContentLoaded', () => {
    // ---- Для страницы оплаты (payment.html) ----
    if (window.location.pathname.includes('payment.html')) {
        const orderNumberSpan = document.getElementById('order-number');
        const timerSpan = document.getElementById('timer');
        const checkPaymentBtn = document.getElementById('check-payment-btn');
        const paymentStatusDiv = document.getElementById('payment-status');
        const loadingMessage = paymentStatusDiv.querySelector('.loading-message');
        const successMessage = paymentStatusDiv.querySelector('.success-message');
        const errorMessage = paymentStatusDiv.querySelector('.error-message');

        // 1. Генерация случайного номера заказа
        const generateOrderNumber = () => {
            return Math.floor(100000 + Math.random() * 900000); // 6-значное число
        };
        orderNumberSpan.textContent = generateOrderNumber();

        // 2. Таймер на 15 минут
        let timeLeft = 15 * 60; // 15 минут в секундах

        const updateTimer = () => {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timerSpan.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                timerSpan.textContent = "Время истекло!";
                checkPaymentBtn.disabled = true;
                checkPaymentBtn.textContent = "Время на оплату вышло";
                timerSpan.style.color = '#c0392b';
                // Возможно, показать сообщение об истечении времени
                // errorMessage.style.display = 'block'; // Можно активировать сообщение об ошибке
                // loadingMessage.style.display = 'none';
                // paymentStatusDiv.style.display = 'block';
            } else {
                timeLeft--;
            }
        };

        const timerInterval = setInterval(updateTimer, 1000);
        updateTimer(); // Вызываем сразу, чтобы отобразить начальное значение

        // 3. Обработка кнопки "Проверить оплату"
        checkPaymentBtn.addEventListener('click', () => {
            checkPaymentBtn.disabled = true;
            loadingMessage.style.display = 'block';
            successMessage.style.display = 'none';
            errorMessage.style.display = 'none';
            paymentStatusDiv.style.display = 'block';
                      // Имитация задержки проверки оплаты
            setTimeout(() => {
                loadingMessage.style.display = 'none';

                // Для демонстрации, можем сделать 50/50 успех/ошибка
                // Но по запросу всегда "Ваш заказ в обработке"
                successMessage.style.display = 'block';
                checkPaymentBtn.style.display = 'none'; // Скрыть кнопку после успешной "оплаты"
                clearInterval(timerInterval); // Остановить таймер
                timerSpan.style.color = '#28a745'; // Зеленый таймер
                timerSpan.textContent = "Оплачено!";

                // Или случайный исход:
                /*
                if (Math.random() < 0.8) { // 80% успеха
                    successMessage.style.display = 'block';
                    checkPaymentBtn.style.display = 'none';
                    clearInterval(timerInterval);
                    timerSpan.style.color = '#28a745';
                    timerSpan.textContent = "Оплачено!";
                } else {
                    errorMessage.style.display = 'block';
                    checkPaymentBtn.disabled = false; // Разблокировать кнопку для повторной попытки
                }
                */
            }, 3000); // Имитация 3-секундной проверки
        });
    }

    // Дополнительно: Валидация для формы заказа (order.html)
    if (window.location.pathname.includes('order.html')) {
        const orderForm = document.querySelector('.order-form');
        if (orderForm) {
            orderForm.addEventListener('submit', (event) => {
                const phoneInput = document.getElementById('phone');
                const zipcodeInput = document.getElementById('zipcode');
                const passportInput = document.getElementById('passport');

                // Проверка телефона
                if (!/^\+?[0-9]{10,12}$/.test(phoneInput.value)) {
                    alert('Пожалуйста, введите корректный номер телефона (от 10 до 12 цифр, возможно с плюсом).');
                    event.preventDefault();
                    phoneInput.focus();
                    return;
                }
                // Проверка индекса
                if (!/^[0-9]{6}$/.test(zipcodeInput.value)) {
                    alert('Пожалуйста, введите корректный почтовый индекс (6 цифр).');
                    event.preventDefault();
                    zipcodeInput.focus();
                    return;
                }
                // Проверка паспорта
                if (!/^[0-9]{4}\s[0-9]{6}$/.test(passportInput.value)) {
                    alert('Пожалуйста, введите корректную серию и номер паспорта (4 цифры пробел 6 цифр, например 1234 567890).');
                    event.preventDefault();
                    passportInput.focus();
                    return;
                }

                // Если все ок, форма отправится на payment.html
            });
        }
    }
});
