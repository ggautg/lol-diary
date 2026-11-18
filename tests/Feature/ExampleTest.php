<?php

test('redirige al invitado a la pantalla de inicio de sesión', function () {
    $this->get(route('home'))->assertRedirect(route('login'));
});
