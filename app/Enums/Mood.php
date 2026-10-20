<?php

namespace App\Enums;

enum Mood: string
{
    case Focused = 'focused';
    case Calm = 'calm';
    case Hyped = 'hyped';
    case Tired = 'tired';
    case Tilted = 'tilted';
}