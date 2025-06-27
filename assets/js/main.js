/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  // When we click on each nav__link, we remove the show-menu class
  navMenu.classList.remove("show-menu");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader() {
  const header = document.getElementById("header");
  // When the scroll is greater than 80 viewport height, add the scroll-header class to the header tag
  if (this.scrollY >= 80) header.classList.add("scroll-header");
  else header.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

/*=============== QUESTIONS ACCORDION ===============*/
const accordionItems = document.querySelectorAll(".questions__item");

accordionItems.forEach((item) => {
  const accordionHeader = item.querySelector(".questions__header");

  accordionHeader.addEventListener("click", () => {
    const openItem = document.querySelector(".accordion-open");

    toggleItem(item);

    if (openItem && openItem !== item) {
      toggleItem(openItem);
    }
  });
});

const toggleItem = (item) => {
  const accordionContent = item.querySelector(".questions__content");

  if (item.classList.contains("accordion-open")) {
    accordionContent.removeAttribute("style");
    item.classList.remove("accordion-open");
  } else {
    accordionContent.style.height = accordionContent.scrollHeight + "px";
    item.classList.add("accordion-open");
  }
};

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
function scrollActive() {
  try {
    const scrollY = window.pageYOffset;
    const sections = document.querySelectorAll("section[id]");
    const navMenu = document.querySelector(".nav__menu");

    if (!navMenu) return; // Sai se o menu de navegação não existir

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 58;
      const sectionId = current.getAttribute("id");
      const navLink = navMenu.querySelector(`a[href*="${sectionId}"]`);

      if (navLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLink.classList.add("active-link");
        } else {
          navLink.classList.remove("active-link");
        }
      }
    });
  } catch (error) {
    console.error("Error in scrollActive:", error);
  }
}

/*=============== SHOW SCROLL UP ===============*/
function scrollUp() {
  try {
    const scrollUp = document.getElementById("scroll-up");
    if (!scrollUp) return; // Sai se o elemento não existir

    // Quando o scroll for maior que 400vh, adiciona a classe show-scroll
    if (window.scrollY >= 400) {
      scrollUp.classList.add("show-scroll");
    } else {
      scrollUp.classList.remove("show-scroll");
    }
  } catch (error) {
    console.error("Error in scrollUp:", error);
  }
}

/*=============== SCROLL REVEAL ANIMATION ===============*/
function initScrollReveal() {
  try {
    if (typeof ScrollReveal !== "undefined") {
      const sr = ScrollReveal({
        origin: "top",
        distance: "60px",
        duration: 1000,
        delay: 100,
        // reset: true
      });

      // Configurações de revelação
      const revealConfigs = [
        { selector: `.home__data, .parteners`, config: {} },
        { selector: `.home__img`, config: { delay: 300 } },
        { selector: `.home__social`, config: { delay: 200 } },
        { selector: `.about__img, .contact__box`, config: { origin: "left" } },
        {
          selector: `.about__data, .contact__form`,
          config: { origin: "right" },
        },
        {
          selector: `.steps__card, .product__card, .questions__group, .card__content`,
          config: { interval: 100 },
        },
        { selector: `.section__title-center`, config: { interval: 100 } },
        {
          selector: `.feature-card, .about-differences__text`,
          config: { interval: 100 },
        },
        {
          selector: `.about-cta__content, .about-differences__content`,
          config: { origin: "bottom" },
        },
        {
          selector: `.partners__card`,
          config: {
            interval: 150,
            origin: "bottom",
            distance: "50px",
          },
        },
      ];

      // Aplica todas as configurações
      revealConfigs.forEach((item) => {
        const elements = document.querySelectorAll(item.selector);
        if (elements.length > 0) {
          sr.reveal(item.selector, item.config);
        }
      });
    }
  } catch (error) {
    console.error("Error in ScrollReveal:", error);
  }
}

/*=============== INITIALIZE ALL SCROLL FUNCTIONS ===============*/
document.addEventListener("DOMContentLoaded", function () {
  // Verifica se os elementos necessários existem
  const hasSections = document.querySelectorAll("section[id]").length > 0;
  const hasNavMenu = document.querySelector(".nav__menu") !== null;
  const hasScrollUp = document.getElementById("scroll-up") !== null;

  // Configura os event listeners
  if (hasSections && hasNavMenu) {
    window.addEventListener("scroll", scrollActive);
    scrollActive(); // Executa uma vez no carregamento
  }

  if (hasScrollUp) {
    window.addEventListener("scroll", scrollUp);
    scrollUp(); // Executa uma vez no carregamento
  }

  // Inicializa ScrollReveal
  initScrollReveal();
});

/*=============== DEBOUNCE FOR SCROLL EVENTS ===============*/
// Melhora performance em eventos de scroll
function debounce(func, wait = 10, immediate = true) {
  let timeout;
  return function () {
    const context = this,
      args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// Aplica debounce aos eventos de scroll (opcional para melhor performance)
window.addEventListener("scroll", debounce(scrollActive));
window.addEventListener("scroll", debounce(scrollUp));

//**
// ! Script de Planos dados sobre eles!
//  */

document.addEventListener("DOMContentLoaded", function () {
  // Dados dos planos
  const plansData = {
    essencial: {
      title: "Plano Essencial",
      subtitle: "Para Pequenos Negócios",
      price: "R$ 149,90",
      icon: "assets/img/bronze.png",
      features: [
        {
          title: "Site de uma página",
          description:
            "Landing page moderna, responsiva e otimizada para gerar conversões com velocidade e desempenho superiores.",
        },
        {
          title: "Imagens da empresa/negócio",
          description:
            "Incluso tratamento profissional de até 5 imagens para destacar seus produtos ou serviços com qualidade visual.",
        },
        {
          title: "Mapa de localização",
          description:
            "Integração com Google Maps para facilitar o acesso ao seu endereço e melhorar a experiência do cliente.",
        },
        {
          title: "Botão para WhatsApp",
          description:
            "Contato direto e instantâneo via WhatsApp com mensagem personalizada, aumentando suas chances de conversão.",
        },
        {
          title: "SEO básico",
          description:
            "Configurações iniciais de SEO para ajudar seu site a ser encontrado nos mecanismos de busca.",
        },
      ],
      whyChoose:
        "Ideal para pequenos negócios que buscam presença digital profissional com investimento acessível. A BGM entrega performance, segurança e suporte especializado para sua marca crescer na internet.",
    },

    profissional: {
      title: "Plano Profissional",
      subtitle: "Para Beleza e Desenvolvimento Pessoal",
      price: "R$ 239,90",
      icon: "assets/img/silver.png",
      features: [
        {
          title: "Instagram profissional",
          description:
            "Perfil otimizado com bio estratégica, destaques organizados e conteúdo alinhado ao posicionamento da marca.",
        },
        {
          title: "Edição de 3 imagens e 1 vídeo",
          description:
            "Tratamento visual completo com ajustes técnicos e estética consistente com a identidade do seu negócio.",
        },
        {
          title: "Site de uma página",
          description:
            "Landing page exclusiva com design premium, estrutura conversiva e integração com redes sociais.",
        },
        {
          title: "Sistema com banco de dados",
          description:
            "Infraestrutura robusta para gerenciamento de conteúdos, formulários, usuários.",
        },
        {
          title: "SEO intermediário",
          description:
            "Otimizações estratégicas com uso de palavras-chave, meta tags e estrutura de conteúdo otimizada.",
        },
      ],
      whyChoose:
        "Perfeito para autônomos que desejam visibilidade online com impacto. A BGM oferece suporte contínuo, melhorias mensais e análise de resultados para seu crescimento.",
    },

    empresarial: {
      title: "Plano Empresarial",
      subtitle: "Para Grandes Negócios",
      price: "R$ 330,00",
      icon: "assets/img/gold.png",
      features: [
        {
          title: "Site completo (até 5 páginas)",
          description:
            "Site institucional com páginas otimizadas para apresentar sua marca de forma profissional e eficiente.",
        },
        {
          title: "Sistema com banco de dados",
          description:
            "Infraestrutura robusta para gerenciamento de conteúdos, formulários, usuários.",
        },
        {
          title: "Otimização para anúncios",
          description:
            "Preparação técnica completa para campanhas pagas com integração de pixels e rastreamento de conversões.",
        },
        {
          title: "Edição de 5 imagens e 3 vídeos",
          description:
            "Produção de mídia profissional com identidade visual coesa e alto padrão de qualidade.",
        },
        {
          title: "SEO avançado",
          description:
            "Técnicas avançadas de SEO on-page e técnico com relatórios mensais e acompanhamento de desempenho.",
        },
      ],
      whyChoose:
        "Feito para empresas que precisam de presença digital forte e confiável. A BGM entrega tecnologia, segurança e estratégias digitais sob medida com suporte premium 24/7.",
    },

    "rede-social-basico": {
      title: "Plano Rede Social Básico",
      subtitle: "Para Vendas Online",
      price: "R$ 99,90",
      icon: "assets/img/bronze.png",
      features: [
        {
          title: "5 imagens + 2 vídeos mensais",
          description:
            "Conteúdos visuais de alta qualidade, prontos para engajar e converter nas redes sociais.",
        },
        {
          title: "Instagram configurado",
          description:
            "Perfil profissional com bio estratégica, destaques organizados e guias de produtos.",
        },
        {
          title: "Integração de pagamentos",
          description:
            "Receba via Pix, cartão ou boleto com segurança e sem complicações.",
        },
        {
          title: "Gestão de estoque",
          description:
            "Organização automatizada do inventário com alertas de reposição e sincronização multicanal.",
        },
        {
          title: "Ferramentas de marketing",
          description:
            "Funcionalidades básicas para promover produtos e acompanhar resultados.",
        },
      ],
      whyChoose:
        "Para quem está iniciando no digital, o Plano Básico oferece estrutura, suporte e qualidade para você vender com confiança.",
    },

    "rede-social-intermediario": {
      title: "Plano Rede Social Intermediário",
      subtitle: "Para Vendas Online em Crescimento",
      price: "R$ 140,00",
      icon: "assets/img/silver.png",
      features: [
        {
          title: "10 imagens + 2 vídeos mensais",
          description:
            "Conteúdo visual profissional com direção criativa para destacar sua marca e gerar engajamento.",
        },
        {
          title: "Instagram Premium",
          description:
            "Perfil estratégico com linktree, stories personalizados e guias completos de produtos/serviços.",
        },
        {
          title: "Checkout integrado",
          description:
            "Compra em 1 clique com opções diversas de pagamento e parcelamento fácil.",
        },
        {
          title: "Gestão de estoque avançada",
          description:
            "Monitoramento detalhado com variações de produto e relatórios inteligentes.",
        },
        {
          title: "Marketing e SEO profissional",
          description:
            "Automação de campanhas, estratégias de conteúdo e melhorias contínuas de posicionamento.",
        },
      ],
      whyChoose:
        "Se você já vende online e quer crescer com estratégia, este plano é o próximo passo. A BGM oferece suporte técnico e criativo para escalar suas vendas com eficiência.",
    },

    "rede-social-premium": {
      title: "Plano Rede Social Premium",
      subtitle: "Para Lojas Online Consolidadas",
      price: "R$ 200,00",
      icon: "assets/img/gold.png",
      features: [
        {
          title: "10 imagens + 4 vídeos mensais",
          description:
            "Produção de conteúdo visual premium com narrativa de marca e foco em conversão.",
        },
        {
          title: "Instagram Vendas",
          description:
            "Loja integrada ao Instagram com catálogo de produtos e checkout direto na plataforma.",
        },
        {
          title: "Sistema de pagamento completo",
          description:
            "Checkout transparente com antifraude, diversas opções de pagamento e controle de chargebacks.",
        },
        {
          title: "Gestão de estoque inteligente",
          description:
            "Tecnologia preditiva com integração a marketplaces e relatórios de performance.",
        },
        {
          title: "Marketing e SEO avançado",
          description:
            "Campanhas de tráfego e estratégias de conteúdo com acompanhamento de ROI e melhorias contínuas.",
        },
      ],
      whyChoose:
        "Para marcas consolidadas que desejam excelência em vendas online, a BGM entrega soluções completas com análise de dados, suporte estratégico e resultados reais.",
    },
  };

  // Elementos do modal
  const modal = document.getElementById("planModal");
  const modalTitle = document.getElementById("modalPlanTitle");
  const modalSubtitle = document.getElementById("modalPlanSubtitle");
  const modalPrice = document.getElementById("modalPlanPrice");
  const modalIcon = document.getElementById("modalPlanIcon");
  const modalFeatures = document.getElementById("modalPlanFeatures");
  const closeBtn = document.querySelector(".modal__close");

  // Função para abrir o modal
  function openModal(planId) {
    const plan = plansData[planId];

    if (plan) {
      modalTitle.textContent = plan.title;
      modalSubtitle.textContent = plan.subtitle;
      modalPrice.textContent = plan.price;
      modalIcon.src = plan.icon;
      modalIcon.alt = `Ícone do ${plan.title}`;

      // Atualiza o botão de proposta com o plano selecionado
      const proposalBtn = document.querySelector(".modal__button-secondary");
      proposalBtn.setAttribute("data-plan", plan.title);
      console, console.log(proposalBtn.value);

      // Limpa e adiciona as features
      modalFeatures.innerHTML = "";
      plan.features.forEach((feature) => {
        const li = document.createElement("li");
        li.innerHTML = `<i class="uil uil-check"></i> ${feature}`;
        modalFeatures.appendChild(li);
      });

      // Exibe o modal
      modal.style.display = "block";
      document.body.style.overflow = "hidden";
    }
  }

  // Adiciona eventos aos botões "Ver mais"
  document.querySelectorAll(".card__button").forEach((button) => {
    button.addEventListener("click", function () {
      const planId = this.getAttribute("data-plan");
      openModal(planId);
    });
  });

  // Fecha o modal ao clicar no X
  closeBtn.addEventListener("click", function () {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  });

  // Fecha o modal ao clicar fora
  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });

  // Fecha o modal com a tecla ESC
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && modal.style.display === "block") {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });

  // Função para abrir o modal (atualizada)
  function openModal(planId) {
    const plan = plansData[planId];

    if (plan) {
      // Preenche informações básicas
      modalTitle.textContent = plan.title;
      modalSubtitle.textContent = plan.subtitle;
      modalPrice.textContent = plan.price;
      modalIcon.src = plan.icon;
      modalIcon.alt = `Ícone do ${plan.title}`;
      modalWhyChoose.textContent = plan.whyChoose;

      // Atualiza o data-plan do botão
      const proposalBtn = document.querySelector(".open-proposal-modal");
      if (proposalBtn) {
        proposalBtn.setAttribute("data-plan", planId);
        console.log(
          "Botão de proposta atualizado:",
          proposalBtn.getAttribute("data-plan")
        );
      }

      // Preenche as features com descrição
      modalFeatures.innerHTML = "";
      plan.features.forEach((feature) => {
        const li = document.createElement("li");
        li.innerHTML = `
        <div class="feature-title">
          <i class="uil uil-check"></i> ${feature.title}
        </div>
        <p class="feature-description">${feature.description}</p>
      `;
        modalFeatures.appendChild(li);
      });

      // Atualiza os links dos botões
      const whatsappBtn = document.querySelector(".modal__button-primary");
      const emailBtn = document.querySelector(".modal__button-secondary");

      whatsappBtn.href = `https://wa.me/SEUNUMERO?text=Gostaria%20de%20contratar%20o%20${encodeURIComponent(
        plan.title
      )}`;

      // Exibe o modal
      modal.style.display = "block";
      document.body.style.overflow = "hidden";
    }
  }
});

// Get the modal
var modal = document.getElementById("plan-modal");

// Get the buttons that open the modal
var btns = document.getElementsByClassName("card__button");

// Get the <button> element that closes the modal
var closeButton = document.querySelector(".close");

// Get the hidden input field for the plan type
var planTypeInput = document.getElementById("planType");

// When the user clicks the button, open the modal and set the plan type
for (let btn of btns) {
  btn.addEventListener("click", function () {
    // Get the exact plan title from the card
    var planTitle = this.closest(".card__content")
      .querySelector(".card__header-title")
      .innerText.trim();

    // Set the hidden input field value
    planTypeInput.value = planTitle;

    // Open the modal
    modal.style.display = "block";
    modal.setAttribute("aria-hidden", "false");
  });
}

// When the user clicks on <button> (x), close the modal
closeButton.addEventListener("click", function () {
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
});

// When the user clicks anywhere outside of the modal, close it
window.addEventListener("click", function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
  }
});

document.getElementById("modalForm").addEventListener("submit", function () {
  this.querySelector('button[type="submit"]').innerHTML = "Enviando...";
});
// Função para abrir modal
function openModal(modalId) {
  document.getElementById(modalId).style.display = "block";
  document.body.style.overflow = "hidden";
}

// Função para fechar modal
function closeModal(modalId) {
  document.getElementById(modalId).style.display = "none";
  document.body.style.overflow = "auto";
}

// Fechar modais ao clicar no X ou fora
document
  .querySelectorAll(".modal .close, .modal .modal__close")
  .forEach((closeBtn) => {
    closeBtn.addEventListener("click", function () {
      const modal = this.closest(".modal");
      closeModal(modal.id);
    });
  });

// Fechar ao clicar fora do conteúdo
window.addEventListener("click", function (event) {
  if (event.target.classList.contains("modal")) {
    closeModal(event.target.id);
  }
});

// Botão "Solicitar proposta" - Fecha o modal atual e abre o de formulário
document.addEventListener("click", function (event) {
  if (event.target.closest(".open-proposal-modal")) {
    const button = event.target.closest(".open-proposal-modal");
    const planName = button.getAttribute("data-plan");

    // Fecha o modal de detalhes
    closeModal("planModal");

    // Preenche o campo oculto no formulário
    document.getElementById("planType").value = planName;

    // Abre o modal de proposta
    openModal("proposalModal");

    // Debug: Verifique no console se o valor está sendo definido
    console.log(
      "Plano selecionado:",
      document.getElementById("planType").value
    );
  }
});

// Fechar com ESC
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    document.querySelectorAll(".modal").forEach((modal) => {
      if (modal.style.display === "block") {
        closeModal(modal.id);
      }
    });
  }
});

//**
// ! Phone mask!
//  */

document.addEventListener("DOMContentLoaded", function () {
  const phoneInput = document.getElementById("phone");

  phoneInput.addEventListener("input", function (e) {
    // Remove todos os caracteres que não são números
    let value = e.target.value.replace(/\D/g, "");

    // Aplica a máscara de telefone
    if (value.length > 0) {
      // Telefone fixo (10 dígitos) ou celular (11 dígitos)
      if (value.length <= 10) {
        // Formato: (00) 0000-0000
        value = value.replace(/^(\d{2})(\d{4})(\d{4})$/, "($1) $2-$3");
      } else {
        // Formato: (00) 00000-0000
        value = value.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
      }
    }

    e.target.value = value;
  });
});

/**
 * !Ano automatico
 */

document.querySelector(".year").textContent = new Date().getFullYear();

// Adicionar feedback tátil ao checkbox
document.querySelectorAll(".modern-checkbox").forEach((checkbox) => {
  checkbox.addEventListener("click", function (e) {
    if (e.target.tagName === "INPUT") return;

    const ripple = document.createElement("span");
    ripple.classList.add("ripple-effect");
    const checkmark = this.querySelector(".checkmark");
    checkmark.appendChild(ripple);

    // Posiciona o efeito de ripple onde o usuário clicou
    const rect = checkmark.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    // Remove o efeito após a animação
    ripple.addEventListener("animationend", () => {
      ripple.remove();
    });
  });
});

// Adicionar CSS para o efeito ripple
const rippleStyle = document.createElement("style");
rippleStyle.textContent = `
  .ripple-effect {
    position: absolute;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.7);
    transform: scale(0);
    animation: ripple 0.6s linear;
    pointer-events: none;
    width: 100px;
    height: 100px;
    margin-left: -50px;
    margin-top: -50px;
  }
  
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(rippleStyle);

document.addEventListener("DOMContentLoaded", function () {
  // =============== FUNÇÕES GERAIS ===============

  /**
   * Abre um modal específico
   * @param {HTMLElement} modal - Elemento do modal a ser aberto
   */
  function openModal(modal) {
    if (!modal) return;
    modal.style.display = "block";
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    document.documentElement.style.paddingRight = getScrollbarWidth() + "px";
  }

  /**
   * Fecha um modal específico
   * @param {HTMLElement} modal - Elemento do modal a ser fechado
   */
  function closeModal(modal) {
    if (!modal) return;
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "auto";
    document.documentElement.style.paddingRight = "";
  }

  /**
   * Calcula a largura da barra de rolagem
   */
  function getScrollbarWidth() {
    return window.innerWidth - document.documentElement.clientWidth;
  }

  // =============== CONTROLE DE MODAIS ===============

  // Abrir modal de gerenciamento de dados
  const manageDataBtn = document.getElementById("manageDataBtn");
  if (manageDataBtn) {
    manageDataBtn.addEventListener("click", function (e) {
      e.preventDefault();
      openModal(document.getElementById("dataManagementModal"));
    });
  }

  // Fechar modais ao clicar no botão de fechar
  document.querySelectorAll(".close, .status-close").forEach((btn) => {
    btn.addEventListener("click", function () {
      const modal = this.closest(".modal");
      closeModal(modal);
    });
  });

  // Fechar ao clicar fora do conteúdo do modal
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("modal")) {
      closeModal(e.target);
    }
  });

  // Fechar com ESC
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      document
        .querySelectorAll('.modal[aria-hidden="false"]')
        .forEach((modal) => {
          closeModal(modal);
        });
    }
  });

  // =============== CONTROLE DE ABAS ===============

  // Controle de abas no modal LGPD
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const tabId = this.getAttribute("data-tab");

      // Remove active de todos
      tabBtns.forEach((b) => b.classList.remove("active"));
      tabContents.forEach((c) => c.classList.remove("active"));

      // Adiciona active ao selecionado
      this.classList.add("active");
      document.getElementById(`${tabId}-tab`).classList.add("active");
    });
  });

  // Mostrar/ocultar campo de detalhes no formulário LGPD
  const requestType = document.getElementById("request-type");
  const detailsGroup = document.getElementById("details-group");

  if (requestType && detailsGroup) {
    requestType.addEventListener("change", function () {
      detailsGroup.style.display = this.value === "other" ? "block" : "none";
    });
  }

  // =============== CONTROLE DE FORMULÁRIOS ===============

  /**
   * Mostra o modal de status (sucesso/erro)
   * @param {string} type - 'success' ou 'error'
   * @param {string} message - Mensagem personalizada (opcional)
   */
  function showStatusModal(type, message = "") {
    const modalId = type === "success" ? "confirmationModal" : "errorModal";
    const modal = document.getElementById(modalId);

    if (modal) {
      if (type === "error" && message) {
        const errorMessage = modal.querySelector("#errorMessage");
        if (errorMessage) errorMessage.textContent = message;
      }

      openModal(modal);
    }
  }

  /**
   * Envia um formulário via AJAX
   * @param {HTMLFormElement} form - Elemento do formulário
   * @param {string} formType - Tipo do formulário ('contact' ou 'data')
   */
  async function submitForm(form, formType) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    try {
      // Estado de carregamento
      submitBtn.innerHTML = '<i class="ri-loader-4-line spin"></i> Enviando...';
      submitBtn.disabled = true;

      // Coleta os dados do formulário
      const formData = new FormData(form);

      // Converte para JSON se necessário (para o formulário LGPD)
      const formDataObj = {};
      formData.forEach((value, key) => (formDataObj[key] = value));

      // Envia a requisição
      const response = await fetch(form.action, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataObj),
      });

      // Verifica se a resposta é OK
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }

      // Processa a resposta JSON
      const data = await response.json();

      // Verifica se o servidor retornou sucesso
      if (!data.success) {
        throw new Error(data.message || "Erro no processamento");
      }

      // Fecha o modal do formulário
      const formModalId =
        formType === "contact" ? "proposalModal" : "dataManagementModal";
      const formModal = document.getElementById(formModalId);
      if (formModal) closeModal(formModal);

      // Mostra modal de sucesso
      showStatusModal("success");

      // Reseta o formulário
      form.reset();
    } catch (error) {
      console.error("Erro no formulário:", error);
      // Mostra modal de erro com mensagem
      showStatusModal("error", error.message || "Erro ao enviar formulário");
    } finally {
      // Restaura o botão
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  }

  // Formulário de contato (proposta)
  const contactForm = document.getElementById("modalForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      submitForm(this, "contact");
    });
  }

  // Formulário LGPD (gerenciamento de dados)
  const dataRequestForm = document.getElementById("dataRequestForm");
  if (!dataRequestForm) {
    // Tenta encontrar o formulário dentro do modal
    const dataManagementModal = document.getElementById("dataManagementModal");
    if (dataManagementModal) {
      const form = dataManagementModal.querySelector("form");
      if (form) {
        form.addEventListener("submit", function (e) {
          e.preventDefault();
          submitForm(this, "data");
        });
      }
    }
  } else {
    dataRequestForm.addEventListener("submit", function (e) {
      e.preventDefault();
      submitForm(this, "data");
    });
  }

  // =============== MÁSCARAS DE FORMULÁRIO ===============

  // Máscara para telefone
  const phoneInput = document.getElementById("phone");
  if (phoneInput) {
    phoneInput.addEventListener("input", function (e) {
      let value = this.value.replace(/\D/g, "");
      if (value.length > 11) value = value.substring(0, 11);

      // Aplica a máscara (00) 00000-0000
      if (value.length > 2) {
        value = `(${value.substring(0, 2)}) ${value.substring(2)}`;
      }
      if (value.length > 10) {
        value = `${value.substring(0, 10)}-${value.substring(10)}`;
      }

      this.value = value;
    });
  }

  // =============== ESTILOS DINÂMICOS ===============

  // Estilo para o spinner
  const style = document.createElement("style");
  style.textContent = `
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    .spin {
      animation: spin 1s linear infinite;
      display: inline-block;
    }
  `;
  document.head.appendChild(style);
});
