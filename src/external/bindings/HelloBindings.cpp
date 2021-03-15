#include <emscripten.h>
#include <emscripten/bind.h>
#include <string>
#include "Hello.h"


using namespace emscripten;

EMSCRIPTEN_BINDINGS(Hello) {
    function("printHello", optional_override([]() -> std::string {
            return Hello::printHello();
            }));
}
