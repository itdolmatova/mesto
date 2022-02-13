# Проект: "Mesto"
------
Учебный проект "Яндекс.Практикум" по созданию одностраничного интерактивного сайта, позволяющего сохранять фотографии любых мест и достопримечательностей, удалять их при необходимости и ставить лайки, а также сохранять изменения в профиле пользователя сайта. 

## Описание проекта 

При реализации проекта использовались знания и навыки, полученные в предыдущих спринтах программы:
* флексбокс-вёрстка;
* продвинутая семантика языка HTML;
* построение файловой системы по методологии БЭМ (по правилам Nested);
* адаптивная верстка;
* media queries для задания специфичный правил для разных размеров экранов;
* Grid Layout и иные приемы для создания "отзывчивого дизайна";
* создание и стилизация полей ввода информации формы;
* анимации;
* подключение шрифтов и др.

В данной работе использованы знания, полученные в четвертом спринте, а именно:
 1. реализация логики работы диалогового всплывающего окна на языке JavaScript;
 2. реализация функционала по редактирования информации о пользователе сайта;
 3. работа с коммитами и ветками GitHub на основе стандарта Conventional Commits.

## Ссылки

Текущая версия сайта опубликована по адресу:
[Ссылка на сайт на GitHub.com]()

Сайт построен по макетам в графическом редакторе "Фигма" 
[Ссылка на макет в Figma](https://www.figma.com/file/2cn9N9jSkmxD84oJik7xL7/JavaScript.-Sprint-4?node-id=0%3A1)

to do
подкл шрифт 500 
profile title & subtitle media 1023

edit add button border check

edit button на малых разрешениях спозиционировать relative left
Исследователь океана и аватарка (скорее всего аватарку через div) - на мал.разрешении сделать по центу
переполнение блока с текстом (element__title ++, input name and profession)- многоточие для длинных фраз: 
.block {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
} 

черное сердечко element__like
hover на сердечке
      на edit-button
      на add-button
      на close
      на кнопке Сохранить(submit)