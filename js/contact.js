// Contact Center Interactive Features

// Global state management
const languageState = {
    current: 'en',
    set: function(lang) {
        this.current = lang;
        const form = document.querySelector('.member-services-form');
        if (form) {
            form.setAttribute('lang', lang);
        }
    },
    get: function() {
        return this.current;
    }
};

// Define translations
const translations = {
    en: {
        memberServices: 'Member Services',
        membershipNumber: 'Membership Number',
        membershipPlaceholder: 'Enter your membership number',
        fullName: 'Full Name',
        phoneNumber: 'Phone Number',
        emailAddress: 'Email Address',
        serviceCategory: 'Service Category',
        selectService: 'Select a service',
        message: 'Message',
        submitRequest: 'Submit Request',
        services: {
            membership: 'New Membership',
            products: 'Product Inquiry',
            healthcare: 'Healthcare Services',
            education: 'Educational Support',
            feedback: 'Feedback/Suggestions'
        },
        errors: {
            required: 'This field is required',
            invalidEmail: 'Please enter a valid email address',
            invalidPhone: 'Please enter a valid 10-digit Indian phone number'
        }
    },
    hi: {
        memberServices: 'सदस्य सेवाएं',
        membershipNumber: 'सदस्यता संख्या',
        membershipPlaceholder: 'अपनी सदस्यता संख्या दर्ज करें',
        fullName: 'पूरा नाम',
        phoneNumber: 'फ़ोन नंबर',
        emailAddress: 'ईमेल पता',
        serviceCategory: 'सेवा श्रेणी',
        selectService: 'सेवा का चयन करें',
        message: 'संदेश',
        submitRequest: 'अनुरोध भेजें',
        services: {
            membership: 'नई सदस्यता',
            products: 'उत्पाद पूछताछ',
            healthcare: 'स्वास्थ्य सेवाएं',
            education: 'शैक्षिक सहायता',
            feedback: 'प्रतिक्रिया/सुझाव'
        },
        errors: {
            required: 'यह फ़ील्ड आवश्यक है',
            invalidEmail: 'कृपया एक वैध ईमेल पता दर्ज करें',
            invalidPhone: 'कृपया एक वैध 10 अंकों का भारतीय फोन नंबर दर्ज करें'
        }
    },
    mr: {
        memberServices: 'सदस्य सेवा',
        membershipNumber: 'सदस्यत्व क्रमांक',
        membershipPlaceholder: 'तुमचा सदस्यत्व क्रमांक प्रविष्ट करा',
        fullName: 'पूर्ण नाव',
        phoneNumber: 'फोन नंबर',
        emailAddress: 'ईमेल पत्ता',
        serviceCategory: 'सेवा श्रेणी',
        selectService: 'सेवा निवडा',
        message: 'संदेश',
        submitRequest: 'विनंती सबमिट करा',
        services: {
            membership: 'नवीन सदस्यत्व',
            products: 'उत्पाद चौकशी',
            healthcare: 'आरोग्य सेवा',
            education: 'शैक्षणिक मदत',
            feedback: 'अभिप्राय/सूचना'
        },
        errors: {
            required: 'हे क्षेत्र आवश्यक आहे',
            invalidEmail: 'कृपया वैध ईमेल पत्ता प्रविष्ट करा',
            invalidPhone: 'कृपया वैध 10 अंकी भारतीय फोन नंबर प्रविष्ट करा'
        }
    }
};

// Language Selector
function updateLanguage(lang) {
    try {
        const form = document.querySelector('.member-services-form');
        if (!form) {
            console.log('Member services form not found');
            return;
        }

        languageState.set(lang);
        const t = translations[lang];

        // Update text content
        const elements = {
            'h3': t.memberServices,
            'label[for="membershipNo"]': t.membershipNumber,
            'label[for="name"]': t.fullName,
            'label[for="phone"]': t.phoneNumber,
            'label[for="email"]': t.emailAddress,
            'label[for="serviceType"]': t.serviceCategory,
            'label[for="message"]': t.message,
            '.submit-btn': t.submitRequest
        };

        Object.entries(elements).forEach(([selector, text]) => {
            const element = form.querySelector(selector);
            if (element) element.textContent = text;
        });

        // Update placeholders
        const membershipInput = form.querySelector('#membershipNo');
        if (membershipInput) membershipInput.placeholder = t.membershipPlaceholder;

        // Update select options
        const select = form.querySelector('#serviceType');
        if (select) {
            select.innerHTML = `<option value="">${t.selectService}</option>`;
            Object.entries(t.services).forEach(([value, text]) => {
                const option = document.createElement('option');
                option.value = value;
                option.textContent = text;
                select.appendChild(option);
            });
        }

        // Update any existing error messages
        const errorMessages = form.querySelectorAll('.error-message');
        errorMessages.forEach(msg => {
            const field = msg.previousElementSibling;
            if (field) {
                const type = field.type === 'email' ? 'invalidEmail' :
                           field.type === 'tel' ? 'invalidPhone' : 'required';
                msg.textContent = t.errors[type];
            }
        });

    } catch (error) {
        console.error('Error updating language:', error);
    }
}

// Validation Helper Functions
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^(?:\+91|0)?[6-9]\d{9}$/;
    return re.test(phone.replace(/[\s-]/g, ''));
}

// Form validation setup
function setupValidationListeners() {
    const form = document.getElementById('serviceForm');
    if (!form) return;

    const emailInput = form.querySelector('#email');
    const phoneInput = form.querySelector('#phone');

    if (emailInput) {
        emailInput.addEventListener('input', (e) => {
            if (e.target.value) {
                if (!validateEmail(e.target.value)) {
                    showError(emailInput, translations[languageState.get()].errors.invalidEmail);
                } else {
                    clearError(emailInput);
                }
            } else {
                clearError(emailInput);
            }
        });
    }

    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            const value = e.target.value.replace(/\D/g, '');
            if (value) {
                if (!validatePhone(value)) {
                    showError(phoneInput, translations[languageState.get()].errors.invalidPhone);
                } else {
                    clearError(phoneInput);
                }

                // Format phone number
                let formattedValue = value;
                if (value.length <= 5) {
                    formattedValue = value.replace(/(\d{0,5})/, '$1');
                } else {
                    formattedValue = value.replace(/(\d{5})(\d{0,5})/, '$1-$2');
                }
                if (formattedValue !== e.target.value) {
                    e.target.value = formattedValue;
                }
            } else {
                clearError(phoneInput);
            }
        });
    }
}

function showError(field, message) {
    clearError(field);
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    field.parentElement.appendChild(errorDiv);
    field.classList.add('error');
}

function clearError(field) {
    const errorDiv = field.parentElement.querySelector('.error-message');
    if (errorDiv) {
        errorDiv.remove();
    }
    field.classList.remove('error');
}

// Form Validation
function validateForm() {
    const form = document.getElementById('serviceForm');
    if (!form) return false;

    const currentLanguage = languageState.get();
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            showError(field, translations[currentLanguage].errors.required);
        } else {
            clearError(field);
        }
    });

    const phone = form.querySelector('#phone');
    const email = form.querySelector('#email');

    if (phone && phone.value && !validatePhone(phone.value)) {
        isValid = false;
        showError(phone, translations[currentLanguage].errors.invalidPhone);
    }

    if (email && email.value && !validateEmail(email.value)) {
        isValid = false;
        showError(email, translations[currentLanguage].errors.invalidEmail);
    }

    return isValid;
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    try {
        // Set up language buttons
        const langButtons = document.querySelectorAll('.lang-btn');
        if (langButtons) {
            langButtons.forEach(btn => {
                btn.addEventListener('click', function() {
                    const lang = this.getAttribute('data-lang');
                    if (lang) {
                        langButtons.forEach(b => b.classList.remove('active'));
                        this.classList.add('active');
                        updateLanguage(lang);
                    }
                });
            });
        }

        // Initialize form validation
        setupValidationListeners();

        // Set initial language
        updateLanguage('en');

        // Initialize form submission
        const form = document.getElementById('serviceForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                if (validateForm()) {
                    // Here you would typically send the form data to your server
                    console.log('Form is valid, ready to submit');
                    form.reset();
                }
            });
        }
    } catch (error) {
        console.error('Error initializing contact form:', error);
    }
});