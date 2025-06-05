<?php
use OpenAI;

class OpenAIHelper
{
    public static function getSearchLabels($userQuery)
    {
        $client = OpenAI::client(OPENAI_API_KEY);
        if (!$client) {
            throw new Exception('OpenAI client initialization failed. Please check your API key.');
        }

        $prompt = "Extract 5-7 product-related search tags from this query: \"$userQuery\". 
Return the result as a plain JSON array of lowercase tags, e.g. [\"hat\", \"wool\", \"black\"]";

        $response = $client->chat()->create([
            'model' => 'gpt-4', // or gpt-3.5-turbo
            'messages' => [
                ['role' => 'system', 'content' => 'You are an assistant that transforms user product queries into search keywords.'],
                ['role' => 'user', 'content' => $prompt]
            ],
            'temperature' => 0.2
        ]);

        $answer = $response->choices[0]->message->content;
        return json_decode($answer, true); // should return array
    }
}
