gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText, ScrollToPlugin);

ScrollSmoother.create({
  smooth: 1.5,
  effects: true,
});

function awaitPreloader() {
  const textGroup = document.querySelectorAll('.textSplit');
  textGroup.forEach((text) => {
    SplitText.create(text, {
      type: 'lines,words, chars',
      mask: 'lines',
      onSplit(self) {
        gsap.from(self.chars, {
          y: 40,
          opacity: 0,
          duration: 0.3,
          stagger: 0.05,
          scrollTrigger: {
            trigger: self.chars,
            markers: false,
          },
        });
      },
    });
  });

  // SplitText.create('.rightText a', {
  //   type: 'words, chars',
  //   mask: 'words',
  //   onSplit(self) {
  //     gsap.from(self.chars, {
  //       y: 40,
  //       delay: 2.5,
  //       opacity: 0,
  //       duration: 0.3,
  //       stagger: 0.05,
  //     });
  //   },
  // });

  gsap.from('.hero', {
    opacity: 0,
    duration: 2,
  });

  gsap.from('.picture', {
    y: -60,
    duration: 1,
  });

  gsap.from('.picture-2', {
    y: 60,
    duration: 1,
  });

  gsap.from('.card', {
    opacity: 0,
    stagger: 0.3,
    filter: 'blur(10px)',
    scrollTrigger: {
      trigger: '.cards',
      markers: false,
      start: '0% 80%',
      end: '100% 80%',
      scrub: true,
    },
  });

  gsap.from('.thankyouList ul li', {
    opacity: 0,
    stagger: 0.3,
    filter: 'blur(20px)',
    scrollTrigger: {
      trigger: '.thankyouStatement',
      markers: false,
      start: '0% 80%',
      end: '100% 80%',
      scrub: true,
    },
  });

  gsap.from('footer', {
    y: '-30%',
    immediateRender: false,
    scrollTrigger: {
      trigger: 'footer',
      markers: false,
      scrub: true,
      end: '100% 100%',
      invalidateOnRefresh: true,
    },
  });

  gsap.utils.toArray('.card').forEach((card) => {
    const anim = gsap.to(card, {
      scale: 1.1,
      duration: 0.3,
      paused: true,
      ease: 'back.out(1.7)',
    });
    card.addEventListener('mouseenter', () => anim.play());
    card.addEventListener('mouseleave', () => anim.reverse());
  });

  document.querySelectorAll('a[href^="#cities"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = this.getAttribute('href');
      console.log(target);
      gsap.to(window, {
        duration: 2,
        scrub: false,
        scrollTo: target,
        onComplete: () => {
          ScrollTrigger.refresh();
        },
      });
    });
  });
}

let tl = gsap.timeline({
  onComplete: () => {
    gsap.to('#preloader', {
      opacity: 0,
      display: 'none',
    });
    awaitPreloader();
  },
});

tl.to('#preloader path', {
  duration: 1,
  fill: 'rgb(168,19,19)',
  stroke: 'rgb(233, 236, 238)',
  strokeDashoffset: 0,
  ease: 'linear',
});

tl.to('#preloader path', {
  fill: 'rgb(168,19,19)',
  stroke: 'rgb(65, 9, 9)',
  strokeDashoffset: 0,
  duration: 0.5,
});

const cards = document.querySelectorAll('.card');

cards.forEach((card) => {
  card.addEventListener('click', function () {
    const url = this.getAttribute('data-url');
    console.log(url);
    if (url) {
      window.open(url, '_blank');
    }
  });
});
