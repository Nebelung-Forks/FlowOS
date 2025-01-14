loadJS('https://flow-works.github.io/appstore/apps.js', () => {
	Object.values(appStore).forEach((data) => {
		const a = document.createElement('div');
		a.classList.add('tooltip');
		a.href = '#';

		const h3 = document.createElement('h3');
		const p = document.createElement('p');
		const button = document.createElement('button');
		p.innerText = data.url;
		h3.innerText = data.title;

		const span = document.createElement('span');
		if (parent.config.apps.get()[data.APP_ID]) {
			button.innerText = 'Uninstall';
			h3.innerText = `${data.title} (Installed)`;
			span.innerText = `${data.title} (Installed)`;
		} else {
			button.innerText = 'Install';
			h3.innerText = data.title;
			span.innerText = data.title;
		};
		a.appendChild(span);

		const img = document.createElement('img');
		img.setAttribute('width', '100px');
		img.src = `/assets/icons/${data.APP_ID}.svg`;
		a.appendChild(img);
		a.appendChild(h3);
		h3.appendChild(p);
		button.style.background = 'var(--window-bg)';
		h3.appendChild(button);

		button.onclick = () => {
			const obj = {
				...parent.config.apps.get()
			};
			if (parent.config.apps.get()[data.APP_ID]) {
				delete obj[data.APP_ID];
			} else {
				obj[data.APP_ID] = data;
			}
			parent.config.apps.set(obj);
			window.location.reload();
			parent.document.querySelector('.app-switcher .apps').innerHTML = '';
			parent.Flow.apps.register();
		};

		document.querySelector('.apps').appendChild(a);
	});

	const tooltips = document.querySelectorAll('.tooltip span');

	window.onmousemove = (e) => {
		const x = `${e.clientX + 20}px`;
		const y = `${e.clientY + 20}px`;
		for (const tooltip of tooltips) {
			tooltip.style.top = y;
			tooltip.style.left = x;
		}
	};
});