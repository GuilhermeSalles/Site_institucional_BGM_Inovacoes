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
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 58,
      sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

/*=============== SHOW SCROLL UP ===============*/
function scrollUp() {
  const scrollUp = document.getElementById("scroll-up");
  // When the scroll is higher than 400 viewport height, add the show-scroll class to the a tag with the scroll-top class
  if (this.scrollY >= 400) scrollUp.classList.add("show-scroll");
  else scrollUp.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollUp);

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 1000,
  delay: 100,
  // reset: true
});

sr.reveal(`.home__data, .parteners`);
sr.reveal(`.home__img`, { delay: 300 });
sr.reveal(`.home__social`, { delay: 200 });
sr.reveal(`.about__img, .contact__box`, { origin: "left" });
sr.reveal(`.about__data, .contact__form`, { origin: "right" });
sr.reveal(`.steps__card, .product__card, .questions__group, .card__content`, {
  interval: 100,
});
sr.reveal(`.section__title-center`, { interval: 100 });
sr.reveal(`.feature-card, .about-differences__text`, { interval: 100 });
sr.reveal(`.about-cta__content, .about-differences__content`, {
  origin: "bottom",
});

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
            "Landing page profissional com design moderno e 100% responsivo, otimizada para conversões e desempenho.",
        },
        {
          title: "Imagens da empresa/negócio",
          description:
            "Incluso tratamento profissional de até 5 imagens para destacar seus produtos/serviços com alta qualidade.",
        },
        {
          title: "Mapa de localização",
          description:
            "Integração com Google Maps para clientes encontrarem seu estabelecimento com facilidade e verem rotas.",
        },
        {
          title: "Botão para WhatsApp",
          description:
            "Botão de contato direto que aumenta em até 300% a taxa de conversão, com mensagem personalizável.",
        },
        {
          title: "SEO básico",
          description:
            "Configurações essenciais de SEO para melhorar seu posicionamento orgânico nos mecanismos de busca.",
        },
      ],
      whyChoose:
        "A BGM oferece a solução perfeita para pequenos negócios que desejam presença online profissional sem investimento alto. Nossos sites são otimizados para performance, segurança e conversão, com suporte especializado para ajudá-lo a aproveitar ao máximo sua presença digital.",
    },

    profissional: {
      title: "Plano Profissional",
      subtitle: "Para Negócios de Beleza e Desenvolvimento Pessoal",
      price: "R$ 239,90",
      icon: "assets/img/silver.png",
      features: [
        {
          title: "Instagram profissional",
          description:
            "Configuração completa do perfil, incluindo bio otimizada, destaques categorizados e guia de conteúdo estratégico.",
        },
        {
          title: "Edição de 3 imagens e 1 vídeo",
          description:
            "Tratamento profissional com ajuste de cores, cortes precisos, efeitos e padrão estético alinhado à sua marca.",
        },
        {
          title: "Site de uma página",
          description:
            "Landing page premium com design exclusivo, elementos de conversão otimizados e integração com redes sociais.",
        },
        {
          title: "Formulário de E-mail",
          description:
            "Sistema integrado para captação de leads com envio automático de confirmação e notificação em tempo real.",
        },
        {
          title: "SEO intermediário",
          description:
            "Otimização avançada com keywords estratégicas, meta tags e estruturação de conteúdo para melhor rankeamento.",
        },
      ],
      whyChoose:
        "Especialmente desenvolvido para profissionais autônomos, nosso Plano Profissional combina presença digital completa com gestão estratégica. Oferecemos suporte contínuo, atualizações mensais e relatórios de performance para você acompanhar seu crescimento online.",
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
            "Site institucional profissional com estrutura completa: Home, Sobre, Serviços, Portfólio e Contato.",
        },
        {
          title: "Sistema com banco de dados",
          description:
            "Backend robusto para gestão de conteúdo, formulários, usuários e dados do negócio.",
        },
        {
          title: "Otimização para anúncios",
          description:
            "Estrutura preparada para campanhas de tráfego pago com pixels de conversão e landing pages otimizadas.",
        },
        {
          title: "Edição de 5 imagens e 3 vídeos",
          description:
            "Pacote completo de tratamento de mídia com padrão profissional e identidade visual consistente.",
        },
        {
          title: "SEO avançado",
          description:
            "Estratégia completa de SEO técnico e on-page com relatórios mensais de performance e rankeamento.",
        },
      ],
      whyChoose:
        "Solução completa para empresas que demandam presença digital robusta. Na BGM, combinamos tecnologia avançada com estratégia digital para entregar resultados mensuráveis. Nossa equipe especializada garante performance, segurança e escalabilidade para seu negócio digital com suporte prioritário 24/7.",
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
            "Conteúdo visual profissional editado e otimizado para redes sociais, com padrão de qualidade premium.",
        },
        {
          title: "Instagram configurado",
          description:
            "Perfil otimizado com bio estratégica, destaques organizados e guias de produtos/serviços.",
        },
        {
          title: "Integração de pagamentos",
          description:
            "Sistema seguro para recebimentos online com Pix, cartões e boleto, sem taxa adicional.",
        },
        {
          title: "Gestão de estoque",
          description:
            "Controle automatizado de inventário com alertas e sincronização entre plataformas.",
        },
        {
          title: "Ferramentas de marketing",
          description:
            "Recursos básicos de promoção e análise de desempenho para impulsionar suas vendas.",
        },
      ],
      whyChoose:
        "Ideal para quem está começando no e-commerce, nosso Plano Básico oferece tudo que você precisa para vender online com profissionalismo. Na BGM, simplificamos o complexo mundo das vendas digitais, oferecendo suporte dedicado e soluções que realmente funcionam para pequenos empreendedores.",
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
            "Pacote ampliado de conteúdo visual com edição profissional e direção criativa estratégica.",
        },
        {
          title: "Instagram Premium",
          description:
            "Perfil otimizado com linktree exclusivo, stories destacados e guias de produtos avançados.",
        },
        {
          title: "Checkout integrado",
          description:
            "Processo de compra simplificado em 1 clique com múltiplas opções de pagamento e parcelamento.",
        },
        {
          title: "Gestão de estoque avançada",
          description:
            "Controle completo com variações de produtos, alertas automáticos e relatórios de giro.",
        },
        {
          title: "Marketing e SEO profissional",
          description:
            "Estratégias avançadas de posicionamento orgânico e ferramentas de automação de promoções.",
        },
      ],
      whyChoose:
        "Para negócios em fase de crescimento, nosso Plano Intermediário oferece ferramentas poderosas para escalar suas vendas. Na BGM, entendemos os desafios do e-commerce e oferecemos soluções práticas com suporte especializado para você focar no que realmente importa: crescer seu negócio.",
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
            "Produção de conteúdo profissional completo com direção criativa e identidade visual premium.",
        },
        {
          title: "Instagram Vendas",
          description:
            "Configuração completa da loja no Instagram com catálogo de produtos e integração direta ao checkout.",
        },
        {
          title: "Sistema de pagamento completo",
          description:
            "Todas as formas de pagamento com checkout transparente, antifraude e gestão de chargeback.",
        },
        {
          title: "Gestão de estoque inteligente",
          description:
            "Sistema preditivo com integração em marketplaces e alertas de reposição automatizados.",
        },
        {
          title: "Marketing e SEO avançado",
          description:
            "Estratégias completas de tráfego orgânico e pago com relatórios detalhados de ROI.",
        },
      ],
      whyChoose:
        "Solução completa para lojas online estabelecidas que buscam excelência operacional. A BGM oferece tecnologia de ponta combinada com estratégia digital especializada para maximizar suas vendas. Nosso time de especialistas trabalha lado a lado com você para garantir os melhores resultados, com análises periódicas e ajustes estratégicos contínuos.",
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
