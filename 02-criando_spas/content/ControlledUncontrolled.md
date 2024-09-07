## Controlled vs Uncontrolled

Quando controlamos o estado do componente, seja nos valores recebidos e na atualização em tempo real dele, estamos falando de controlled component. É uma boa pedida para visualização dos componentes em tela, porém isso tem um custo pois o react estará recalculando os componentes e atualizando eles em tela em tempo de atualização de cada componente. Visto isso é recomendado o uso de controlled componentes em formulários simples.

Podemos acessar o valor dos componentes apenas quando necessário, esse é o caso de uso para uncontrolled component. É indicado para formulários com muitos componentes, onde controlar cada campo pode ser um gargalo pois o react irá realizar diversas renderizações.