#
# Framsticks SDK makefile for Emscripten builds
#

include frams/Makefile-SDK-files

JS_PATH=../js/sdk

#Note: CURDIR needed because on linux, Emscripten does not differentiate between relative and absolute path, which causes shutil to raise Error("%s and %s are the same file" % (src, dst))
ifeq ($(OS),Windows_NT)
	CACHE_DIR=cache-tmp 
else
	CACHE_DIR=$(CURDIR)/cache-tmp 
endif

SDK_JS=$(JS_PATH)/frams-sdk.js
SDK_BIN=$(JS_PATH)/frams-sdk.bc
I_PATH=$(JS_PATH)/js_interface

I_OBJ=$(I_PATH)/js_interface.o
I_SRC=$(I_PATH)/js_interface.cpp
I_IMPL_SRC=$(I_PATH)/js_interface_impl.cpp
I_IMPL_JS=$(I_PATH)/js_interface_impl.js
I_IDL=$(I_PATH)/js_interface.idl

# same as in cpp/frams/Makefile-SDK:
CXXWARNINGS=-Wall -Wno-parentheses -Wno-overloaded-virtual -Wno-format -Werror=return-type

SDK_BUILD_CONFIG= -include frams/config/sdk_build_config.h
CACHE_DESTINATION= --cache $(CACHE_DIR)
CXXFLAGS= -I$(CURDIR) -std=gnu++11 -O3 $(SDK_BUILD_CONFIG) $(CXXWARNINGS) $(CACHE_DESTINATION)

#############################################

$(SDK_JS): $(I_IMPL_JS) $(I_IMPL_SRC) $(I_OBJ) $(SDK_BIN)
	$(CXX) $(SDK_BIN) $(I_OBJ) --post-js $(I_IMPL_JS) -g4 --memory-init-file 0 -s FORCE_FILESYSTEM=1 -s ALIASING_FUNCTION_POINTERS=0 -s ALLOW_MEMORY_GROWTH=1 -s ASSERTIONS=3 -s BINARYEN_ASYNC_COMPILATION=0 -s WASM=0 $(CACHE_DESTINATION) -o $@

$(SDK_BIN): $(SDK_LIB_OBJS)
	$(CXX) $(SDK_LIB_OBJS) $(LDFLAGS) $(CACHE_DESTINATION) -o $@

$(I_IMPL_SRC) $(I_IMPL_JS): $(I_IDL)
	python $(EMSCRIPTEN)/tools/webidl_binder.py $(I_IDL) $(I_PATH)/js_interface_impl

#############################################


full_clean:
ifeq ($(OS),Windows_NT)
	del /s /q WebIDLGrammar.pkl parser.out *.o
	rmdir /s /q $(CACHE_DIR)
else
	rm -f WebIDLGrammar.pkl parser.out $(SDK_LIB_OBJS)
	rm -rf $(CACHE_DIR)
endif
