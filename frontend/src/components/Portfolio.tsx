import Image from "next/image";
import PortfolioImage from "./PortfolioImage";
import { Title1, Title2, Title3 } from "@/components/Title";
import Info from "./Info";
import Link from "next/link";

export default function Portoflio() {
	return (
		<div className="font-mono flex flex-col gap-[32px] row-start-2 itmes-stretch w-full">
			<Info />
			<Title1 className="text-center w-full w-full h-full">Опыт работы</Title1>
			<p>
				Всем привет, меня зовут Арег!
				<br />
				<br />
				Я Unity-разработчик с 3-летним опытом работы в филиале №11 ООО «ОЦРВ» (Сириус) в группе «Игровые технологии».
				За это время я занимался разработкой и внедрением игровых механик, плагинов, сетевых решений и SDK. Основная работа велась на движке Unity, однако у меня также есть опыт разработки на других игровых движках.
				Подробнее о проектах можно прочитать ниже.
				<br />
				<br />
				Помимо основной работы, интересуюсь низкоуровневой графикой (Vulkan, OpenGL) и оптимизацией рендеринга.
				В свободное время разрабатываю собственный небольшой движок на Vulkan.
				Стремлюсь к глубокому пониманию принципов работы игровых движков и созданию производительных решений.
			</p>

			<Title2>Проекты</Title2>

			{/*### АССИСТЕНТ И МАШИНИСТ */}
			<Title3>Машинист и Ассистент</Title3>
			<p>
				«Машинист и Ассистент» — это кооперативная игра, в которой игроки могут подключаться к игре
				через QR-код на своих мобильных устройствах. Каждый игрок выполняет свою роль, чтобы поезд
				вовремя прибыл на станцию. <br />
				Машинист управляет составом, а Ассистент занимается устранением неполадок и успокаиванием
				недовольных пассажиров.
			</p>
			<PortfolioImage src="/project/Machinist_Assistent.png" alt="Machinist and assistent" />

			<section>
				<p>
					<b>Мои задачи:</b>
				</p>
				<ul className="list-disc pl-6">
					<li>Взаимодействие мобильного веб-клиента (джойстика) и игры через WebSocket-сервер</li>
					<li>Реализация Utility AI плагина для ИИ пассажиров</li>
					<li>
						Реализация игровых механик
						<ul className="list-disc pl-6 text-foreground-s">
							<li>Передвижение пассажиров </li>
							<li>Генерация игровой карты </li>
							<li>и т. д.</li>
						</ul >
					</li>
				</ul>
				<br />
				<p>
					<b>Стек:</b>
				</p>
				<ul className="list-disc pl-6">
					<li>Unity / C#</li>
					<li>Entitas (ECS-фреймворк)</li>
					<li>Unitask</li>
					<li>UI Toolkit</li>
					<li>websocket-sharp</li>
				</ul>
			</section>

			{/*### МЕДИЦИНСКАЯ ПЛАТФОРМА */}
			<Title3>Медицинская платформа</Title3>
			<p>
				Сотрудники железнодорожной отрасли регулярно проходят тестирование на специализированных
				аналоговых устройствах. Чтобы сделать этот процесс более удобным, мы решили перенести
				тестирование в онлайн-пространство.
				<br />
				Чтобы определить свою профессиональную пригодность, работники должны пройти серию мини-игр,
				которые проверят их внимание, память, реакцию и другие важные навыки.
				<br />
			</p>
			<PortfolioImage src="/project/GamePlatform.png" alt="Game Platform" />
			<section>
				<p>
					<b>Мои задачи:</b>
				</p>
				<ul className="list-disc pl-6">
					<li>
						Ресёрч по игровым движкам
						<br />
						<span className="text-foreground-s">
							Для этого проекта Unity не подходил по ряду пунктов, поэтому в результате обсуждения было принято решение использовать Defold
						</span>
					</li>
					<li>
						Написание SDK для взаимодействия игр c бэкенда <br />
						<span className="text-foreground-s">
							<ul className="list-disc pl-6">
								<li>Запись результатов тестирования</li>
								<li>Получение данных для настройки уровня сложности </li>
								<li>Загрузка конфигурации игры</li>
								<li>и т. д.</li>
							</ul >
						</span>
					</li>
					<li>Разработка мини-игры "Найди фигуру"</li>
					<li>Написание серверной части</li>
				</ul>
				<br />

				<p><b>Стек:</b></p>
				<ul className="list-disc pl-6">
					<li>
						<b>Игры</b>
						<ul className="list-disc pl-6">
							<li>Defold / Lua (игровой движок)</li>
							<li>Druid (UI плагин для Defold)</li>
						</ul>
					</li>
					<li>
						<b>Backend</b>
						<ul className="list-disc pl-6">
							<li>Go + Fiber (бэкенд)</li>
							<li>Redis</li>
							<li>PostgreSQL</li>
							<li>MinIO</li>
							<li>Jenkins</li>
						</ul>
					</li>
				</ul>
			</section>

			{/*### СКЛАД */}
			<Title3>Склад</Title3>
			<p>
				В этой игре пользователям предстоит распределять грузы по вагонам, следуя определённым
				правилам. За успешную отправку составов игрок получает игровую валюту, которую можно
				использовать для улучшения склада, железной дороги и других игровых аспектов.
			</p>
			<PortfolioImage src="/project/Warehouse.jpg" alt="Warehouse" />
			<section>
				<p>
					<b>Мои задачи:</b>
				</p>
				<ul className="list-disc pl-6">
					<li>
						Реализация игровых механик
						<ul className="list-disc pl-6 text-foreground-s">
							<li>Прибытие /отбытие пoездов</li>
							<li>Cистема улучшений</li>
							<li>Cистема ивентов</li>
							<li>и др.</li>
						</ul>
					</li>
					<li>ServiceLocator (Плагин)</li>
					<li>Загрузка ресурсов(текстур, моделей, звуков) из хранилища S3 используя Addressables</li>
					<li>Загрузка конфигураций из Google Таблиц</li>
				</ul>
				<br />
				<p>
					<b>Стек:</b>
				</p>
				<ul className="list-disc pl-6">
					<li>Unity / C#</li>
					<li>Addressables</li>
					<li>Unitask</li>
					<li>UI Toolkit</li>
				</ul>
			</section>
		</div>
	);
}
